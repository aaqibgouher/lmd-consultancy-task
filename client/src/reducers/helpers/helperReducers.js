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

const initialState = {
  openAddUserModel: false,
  openUserCalorieInModel: false,
  openUserCalorieOutModel: false,
  snackbarMessage: "",
  showSnackbar: false,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADD_USER_MODEL:
      console.log("show called");
      return {
        ...state,
        openAddUserModel: true,
      };
    case HIDE_ADD_USER_MODEL:
      return {
        ...state,
        openAddUserModel: false,
      };
    case SHOW_ADD_USER_CALORIE_IN_MODEL:
      return {
        ...state,
        openUserCalorieInModel: true,
      };
    case HIDE_ADD_USER_CALORIE_IN_MODEL:
      return {
        ...state,
        openUserCalorieInModel: false,
      };
    case SHOW_ADD_USER_CALORIE_OUT_MODEL:
      return {
        ...state,
        openUserCalorieOutModel: true,
      };
    case HIDE_ADD_USER_CALORIE_OUT_MODEL:
      return {
        ...state,
        openUserCalorieOutModel: false,
      };
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbarMessage: action.payload,
        showSnackbar: true,
      };
    case HIDE_SNACKBAR:
      return {
        ...state,
        snackbarMessage: "",
        showSnackbar: false,
      };
    default:
      return state;
  }
};

export default userReducers;
