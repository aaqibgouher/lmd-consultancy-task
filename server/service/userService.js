const { default: mongoose } = require("mongoose");
const UserModel = require("../models/UserModel");
const foodService = require("./foodService");
const activityService = require("./activityService");
const { isWithinLast30Days } = require("../utils/Helper");

// get users
const getUsers = async () => {
  return await UserModel.find({});
};

// add user
const addUser = async (name, weight, height, sex, age) => {
  // validation
  if (!name || !name.trim()) throw "Name is required.";
  if (!weight) throw "Weight is required in kg.";
  if (!height) throw "Height is required in cm.";
  if (!sex || !sex.trim()) throw "Sex is required.";
  if (!age) throw "Age is required.";

  // creating params
  let params = { name, weight, height, sex, age };

  //   pushing data
  const userObj = new UserModel(params);
  const savedUser = await userObj.save();

  //   returning user id
  return savedUser._id;
};

// get user details by id
const getUserDetailsById = async (userId, params = {}) => {
  // check if userId is true
  if (!userId) throw "User id is required.";
  // check if user id exists
  let user = await getUserById(userId, params);

  if (!user) throw "User doesn't found by id.";

  return user;
};

// get user by id
const getUserById = async (userId, params = {}) => {
  let user = await UserModel.findById(userId)
    .populate("caloriesIn.foodId")
    .populate("caloriesOut.activityId");

  // if datefor is present
  if (params && params.hasOwnProperty("dateFor") && params["dateFor"]) {
    let parsedDate = new Date(params["dateFor"]);
    console.log(user, parsedDate);
    // get calories in based on date for
    let caloriesIn = await getCaloriesByDate(user, parsedDate, "caloriesIn");

    // get calories out based on date for
    let caloriesOut = await getCaloriesByDate(user, parsedDate, "caloriesOut");

    // get net calories based on date for
    let netCalories = await getCaloriesByDate(user, parsedDate, "netCalories");

    // update user
    user["caloriesIn"] = caloriesIn;
    user["caloriesOut"] = caloriesOut;
    user["netCalories"] = netCalories;
  }

  return user;
};

// add calorie in
const addCaloryInForUserById = async (userId, params) => {
  // validations
  //   user id
  if (!userId) throw "User Id is required.";
  if (!mongoose.Types.ObjectId.isValid(userId)) throw "User id is invalid.";
  // check for user exists with user id or not
  let user = await getUserById(userId);
  if (!user) throw "User doesn't found by id.";

  //   date for
  if (!params.hasOwnProperty("dateFor")) throw "Date for is required";
  if (!params["dateFor"] || !params["dateFor"].trim())
    throw "Date for should be correct.";
  if (!(new Date(params["dateFor"]) instanceof Date)) {
    throw "Invalid date format, Expected like this format: YYYY-MM-DD.";
  }
  //   date should be between 30 days ago till today only
  if (!isWithinLast30Days(new Date(params["dateFor"])))
    throw "You can only add date from last 30 days till today.";

  // foodId
  if (!params.hasOwnProperty("foodId")) throw "Food is required";
  if (!params["foodId"] || !params["foodId"].trim())
    throw "Food value should be correct.";
  if (!mongoose.Types.ObjectId.isValid(params.foodId))
    throw "Food id is invalid.";
  // check for food exists with food id or not
  let food = await foodService.getFoodById(params.foodId);
  if (!food) throw "Food doesn't found by id.";

  // portion
  if (!params.hasOwnProperty("portion")) throw "Portion is required";
  if (!params["portion"])
    throw "Portion value should be correct, and minimum of 1.";

  // time
  if (!params.hasOwnProperty("time")) throw "Time is required";
  if (!params["time"] || !params["time"].trim())
    throw "Time value should be correct.";
  //   check for time : breakfast, lunch, snacks, dinner
  if (!["breakfast", "lunch", "snacks", "dinner"].includes(params.time))
    throw "Time should be breakfast/lunch/snacks/dinner.";

  let dateFor = new Date(params.dateFor);
  let foodId = params.foodId;
  let portion = params.portion;
  let time = params.time;

  // check if same time is not getting again, means if breakfast is already added for today, then it should not be added again for today
  //   let calorieIn = await getCalorieInByUserIdAndDateAndTime(
  //     userId,
  //     dateFor,
  //     time
  //   );

  //   if (calorieIn)
  //     throw `Time (${time}) is already present for date ${params.dateFor}.`;

  // params
  const paramsObj = { foodId, portion, time, dateFor };

  // if everything is correct, add to calorieIn array for that user, for that date, for that time
  user.caloriesIn.push(paramsObj);
  await user.save();

  //   update net calorie for user for particular date
  let updatedUser = await updateNetCaloriesByUserIdByDate(userId, dateFor);

  return updatedUser;
};

// update net calorie for a user for a day
const updateNetCaloriesByUserIdByDate = async (userId, dateFor) => {
  // get user details by id
  let user = await getUserById(userId);

  if (!user) throw "User doesn't found by id.";

  // get calories in by date
  let calorieInByDateFor = await getCaloriesByDate(user, dateFor, "caloriesIn");
  console.log(calorieInByDateFor, "calorie in by date");

  //   get calories out by date
  let calorieOutByDateFor = await getCaloriesByDate(
    user,
    dateFor,
    "caloriesOut"
  );
  console.log(calorieOutByDateFor, "calorie in by date");

  // find net calories data for date wise
  let netCaloriesByDateFor = await getCaloriesByDate(
    user,
    dateFor,
    "netCalories"
  );

  let netCaloryObj = {},
    totalCalories = 0,
    totalOutCalories = 0;

  if (netCaloriesByDateFor.length === 0) {
    // there is nothing, we need to create a object, and then push to it.
    netCaloryObj = {
      totalCalories: 0,
      bmrCalories: 0,
      difference: 0,
      dateFor,
    };
  } else {
    // if already present, take the first object since net calorie will be only one for each date
    netCaloryObj = netCaloriesByDateFor[0];
  }

  // find food calorieIn for that date, loop over each date, take calories for each, and
  if (calorieInByDateFor.length) {
    console.log(calorieInByDateFor, "calories");
    // loop over calories in
    calorieInByDateFor.map((calorieIn) => {
      totalCalories += calorieIn["foodId"]["calories"] * calorieIn["portion"];
    });

    // update netCaloryObj total calories key
    netCaloryObj["totalCalories"] = totalCalories;
  }

  // basal metabolic rate based on sex
  let bmr = await getBmrByUserId(userId);
  // update netCaloryObj total calories key
  netCaloryObj["bmrCalories"] = bmr;

  if (calorieOutByDateFor.length) {
    // loop over calories out
    calorieOutByDateFor.map((calorieOut) => {
      totalOutCalories += calorieOut["caloryBurnt"];
    });
  }

  // net calories per day = food calories per day - basal metobolic rate - activities calories per day
  let difference =
    netCaloryObj?.totalCalories - netCaloryObj?.bmrCalories - totalOutCalories;

  // update difference
  netCaloryObj["difference"] = difference;

  // if net calorie by date for user not exists, create new object and push to array
  if (netCaloriesByDateFor.length === 0) {
    // there is nothing, we need to create a object, and then push to it.
    user?.netCalories.push(netCaloryObj);
  }
  //   else update existing one
  else {
    // find the index of found object in netCalories array
    let index = await getIndexOfObjFromArrByDate(user["netCalories"], dateFor);

    user["netCalories"][index]["totalCalories"] = netCaloryObj["totalCalories"];
    user["netCalories"][index]["bmrCalories"] =
      netCaloryObj["bmrCalories"].toFixed(2);
    user["netCalories"][index]["difference"] =
      netCaloryObj["difference"].toFixed(2);
  }

  //   update in db
  await user.save();
  return await getUserById(userId, { dateFor });
};

// get index of obj from arra by date
const getIndexOfObjFromArrByDate = (arr, dateFor) => {
  if (arr.length) {
    console.log("inside");
    const index = arr.findIndex(
      (obj) =>
        obj.dateFor.toISOString().slice(0, 10) ===
        dateFor.toISOString().slice(0, 10)
    );
    return index;
  } else {
    throw "User's net calories array is empty.";
  }
};

// get bmr by user id
const getBmrByUserId = async (userId) => {
  // get user details by id
  let user = await getUserById(userId);

  if (!user) throw "User doesn't found by id.";

  // bmr = _ + (_ * weight_in_kg) + (_ * height_in_cm) - (_ * age_in_yrs)
  let bmr = 0;
  switch (user.sex) {
    case "male":
      bmr =
        66.473 +
        13.7516 * user?.weight +
        5.0033 * user?.height -
        6.755 * user?.age;
      break;
    case "female":
      bmr =
        655.0955 +
        9.5634 * user?.weight +
        1.8496 * user?.height -
        4.676 * user?.age;
      break;
    default:
      console.log("from default");
  }

  return bmr;
};

// get calories by date
const getCaloriesByDate = async (user, dateFor, calorie) => {
  return user[calorie].filter(
    (obj) =>
      obj.dateFor.toISOString().slice(0, 10) ===
      dateFor.toISOString().slice(0, 10)
  );
};

// get calories in by user id and date
const getCalorieInByUserIdAndDateAndTime = async (userId, date, time) => {
  let user = await getUserById(userId);

  const calorieIn = user["caloriesIn"].find((obj) => {
    return obj.time === time && obj.dateFor.getTime() === date.getTime();
  });

  return calorieIn || null;
};

// add calory out for user id
const addCaloryOutForUserById = async (userId, params) => {
  // validations
  //   user id
  if (!userId) throw "User Id is required.";
  if (!mongoose.Types.ObjectId.isValid(userId)) throw "User id is invalid.";
  // check for user exists with user id or not
  let user = await getUserById(userId);
  if (!user) throw "User doesn't found by id.";

  //   date for
  if (!params.hasOwnProperty("dateFor")) throw "Date for is required";
  if (!params["dateFor"] || !params["dateFor"].trim())
    throw "Date for should be correct.";
  if (!(new Date(params["dateFor"]) instanceof Date)) {
    throw "Invalid date format, Expected like this format: YYYY-MM-DD.";
  }
  //   date should be between 30 days ago till today only
  if (!isWithinLast30Days(new Date(params["dateFor"])))
    throw "You can only add date from last 30 days till today.";

  // activity id
  if (!params.hasOwnProperty("activityId")) throw "Activity is required";
  if (!params["activityId"] || !params["activityId"].trim())
    throw "Activity value should be correct.";
  if (!mongoose.Types.ObjectId.isValid(params.activityId))
    throw "Activity id is invalid.";
  // check for activity exists with activity id or not
  let activity = await activityService.getActivityById(params.activityId);
  if (!activity) throw "Activity doesn't found by id.";

  // duration (in minutes)
  if (!params.hasOwnProperty("duration")) throw "Duration is required";
  if (!params["duration"])
    throw "Duration value should be correct, and in minutes.";

  // calorie burnt
  if (!params.hasOwnProperty("caloryBurnt")) throw "Calory burnt is required";
  if (!params["caloryBurnt"])
    throw "Calory burnt value should be correct, and in number.";

  let dateFor = new Date(params.dateFor);
  let activityId = params.activityId;
  let duration = params.duration;
  //   calories burnt or activity = met * weight (kg) * duration (hr)
  let caloryBurnt = params.caloryBurnt;

  // params
  const paramsObj = { activityId, duration, caloryBurnt, dateFor };

  // if everything is correct, add to calorieIn array for that user, for that date, for that time
  user.caloriesOut.push(paramsObj);
  await user.save();

  //   update net calorie for user for particular date
  let updatedUser = await updateNetCaloriesByUserIdByDate(userId, dateFor);

  return updatedUser;
};

// delete user by id
const deleteUserById = async (userId) => {
  const user = await UserModel.findByIdAndRemove(userId);

  if (!user) {
    throw "User doesn't found by id.";
  } else {
    console.log("deleted");
  }

  return userId;
};

// export
module.exports = {
  getUsers,
  addUser,
  getUserDetailsById,
  getUserById,
  addCaloryInForUserById,
  getCalorieInByUserIdAndDateAndTime,
  updateNetCaloriesByUserIdByDate,
  getCaloriesByDate,
  getBmrByUserId,
  getIndexOfObjFromArrByDate,
  addCaloryOutForUserById,
  deleteUserById,
};
