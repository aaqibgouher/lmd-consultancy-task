import { SHOW_SNACKBAR } from "../../actionTypes/helpers/helperActionTypes";
import {
  FETCH_USERS,
  ADD_USER,
  FETCH_USER,
  ADD_DATE,
  FETCH_ACTIVITIES,
  FETCH_FOODS,
  ADD_USER_CALORIE_IN_BY_ID_AND_DATE,
} from "../../actionTypes/users/userActionTypes";
import {
  getUsers,
  deleteUserById,
  insertUser,
  getUser,
  getFoods,
  getActivities,
  insertUserCalorieInById,
  insertUserCalorieOutById,
} from "../../api/usersApi";

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await getUsers();

    // show snackbar
    // dispatch({
    //   type: SHOW_SNACKBAR,
    //   payload: res.message,
    // });

    //   dispatch users
    dispatch({
      type: FETCH_USERS,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    const res = await deleteUserById(userId);

    // show snackbar
    dispatch({
      type: SHOW_SNACKBAR,
      payload: res.message,
    });
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};

export const addUser = (params) => async (dispatch) => {
  try {
    const res = await insertUser(params);

    // show snackbar
    dispatch({
      type: SHOW_SNACKBAR,
      payload: res.message,
    });
  } catch (error) {
    console.error("Error adding users:", error);
  }
};

export const fetchUser = (userId, date) => async (dispatch) => {
  try {
    const res = await getUser(userId, date);

    dispatch({
      type: FETCH_USER,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error fetching user details by id:", error);
  }
};

export const updateDate = (date) => async (dispatch) => {
  try {
    console.log(date, "from actions");
    dispatch({
      type: ADD_DATE,
      payload: date,
    });
  } catch (error) {
    console.error("Error updating date in user actions:", error);
  }
};

export const fetchFoods = () => async (dispatch) => {
  try {
    const res = await getFoods();

    dispatch({
      type: FETCH_FOODS,
      payload: res.data.slice(0, 100),
    });
  } catch (error) {
    console.error("Error fetching foods:", error);
  }
};

export const fetchActivities = () => async (dispatch) => {
  try {
    const res = await getActivities();

    dispatch({
      type: FETCH_ACTIVITIES,
      payload: res.data.slice(0, 100),
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
  }
};

export const addUserCalorieInByIdAndDate =
  (userId, params) => async (dispatch) => {
    try {
      console.log("user actions api before");
      const res = await insertUserCalorieInById(userId, params);
      console.log(res, "after api user actions");

      // show snackbar
      dispatch({
        type: SHOW_SNACKBAR,
        payload: res.message,
      });

      dispatch({
        type: FETCH_USER,
        payload: res.data,
      });
    } catch (error) {
      // show snackbar
      dispatch({
        type: SHOW_SNACKBAR,
        payload: error.message,
      });
      console.error("Error adding users user actions:", error);
    }
  };

export const addUserCalorieOutByIdAndDate =
  (userId, params) => async (dispatch) => {
    try {
      const res = await insertUserCalorieOutById(userId, params);
      console.log(res, "from actions");

      // show snackbar
      dispatch({
        type: SHOW_SNACKBAR,
        payload: res.message,
      });

      dispatch({
        type: FETCH_USER,
        payload: res.data,
      });
    } catch (error) {
      // show snackbar
      dispatch({
        type: SHOW_SNACKBAR,
        payload: error.message,
      });
      console.error("Error adding users:", error);
    }
  };
