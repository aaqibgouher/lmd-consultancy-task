import {
  SHOW_ADD_USER_MODEL,
  HIDE_ADD_USER_MODEL,
  SHOW_ADD_USER_CALORIE_IN_MODEL,
  HIDE_ADD_USER_CALORIE_IN_MODEL,
  SHOW_ADD_USER_CALORIE_OUT_MODEL,
  HIDE_ADD_USER_CALORIE_OUT_MODEL,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from "../../actionTypes/helpers/helperActionTypes";

export const showAddUserModel = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_ADD_USER_MODEL,
    });
  } catch (error) {
    console.error(
      "Error from toggle add user model helper action users:",
      error
    );
  }
};

export const hideAddUserModel = () => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_ADD_USER_MODEL,
    });
  } catch (error) {
    console.error(
      "Error from toggle hide user model helper action users:",
      error
    );
  }
};

export const showAddUserCalorieInModel = () => async (dispatch) => {
  console.log(1, "show model");
  try {
    dispatch({
      type: SHOW_ADD_USER_CALORIE_IN_MODEL,
    });
  } catch (error) {
    console.error(
      "Error from toggle add user calorie in model helper action users:",
      error
    );
  }
};

export const hideAddUserCalorieInModel = () => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_ADD_USER_CALORIE_IN_MODEL,
    });
  } catch (error) {
    console.error(
      "Error from toggle hide user calorie in model helper action users:",
      error
    );
  }
};

export const showAddUserCalorieOutModel = () => async (dispatch) => {
  console.log("show called actions");
  try {
    dispatch({
      type: SHOW_ADD_USER_CALORIE_OUT_MODEL,
    });
  } catch (error) {
    console.error(
      "Error from toggle add user calorie out model helper action users:",
      error
    );
  }
};

export const hideAddUserCalorieOutModel = () => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_ADD_USER_CALORIE_OUT_MODEL,
    });
  } catch (error) {
    console.error(
      "Error from toggle hide user calorie out model helper action users:",
      error
    );
  }
};

export const showSnackbar = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_SNACKBAR,
      payload: "This is the message",
    });
  } catch (error) {
    console.error("Error from show snackbar helper actions:", error);
  }
};

export const hideSnackbar = () => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_SNACKBAR,
    });
  } catch (error) {
    console.error("Error from hide snackbar helper actions", error);
  }
};
