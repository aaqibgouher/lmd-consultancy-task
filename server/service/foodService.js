const FoodModel = require("../models/FoodModel");

// get foods
const getFoods = async () => {
  return await FoodModel.find({});
};

// get food by id
const getFoodById = async (foodId) => {
  const food = await FoodModel.findById(foodId);

  return food;
};

// export
module.exports = {
  getFoods,
  getFoodById,
};
