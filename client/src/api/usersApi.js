import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const getUsers = async () => {
  try {
    const res = await apiService.get("/api/user/");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(6, "from get users api");
    throw error.res.data;
  }
};

export const deleteUserById = async (userId) => {
  try {
    const res = await apiService.delete(`/api/user/${userId}`);

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(6, "from delete users api");
    throw error.res.data;
  }
};

export const insertUser = async (params) => {
  try {
    const res = await apiService.post(`api/user/add`, params);

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(6, "from delete users api");
    throw error.res.data;
  }
};

export const getUser = async (userId, date) => {
  try {
    console.log(date, "date");
    let url = `/api/user/${userId}`;

    if (date) {
      url += `?dateFor=${date}`;
    }

    const res = await apiService.get(url);

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(6, "from get user detail api");
    throw error.res.data;
  }
};

export const getFoods = async () => {
  try {
    const res = await apiService.get("/api/food");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(6, "from get foods api");
    throw error.res.data;
  }
};

export const getActivities = async () => {
  try {
    const res = await apiService.get("/api/activity");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(6, "from get activities api");
    throw error.res.data;
  }
};

export const insertUserCalorieInById = async (userId, params) => {
  try {
    console.log("before api call file");
    const res = await apiService.post(`api/user/${userId}/calorie-in`, params);

    console.log(res, "after api call ");
    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(6, "from insert user calorie in by id api", error);
    throw error.response.data;
  }
};

export const insertUserCalorieOutById = async (userId, params) => {
  try {
    const res = await apiService.post(`api/user/${userId}/calorie-out`, params);

    console.log(res, "from api");
    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(6, "from insert user calorie out by id api");
    throw error.response.data;
  }
};
