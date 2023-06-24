import {
  FETCH_USER,
  FETCH_USERS,
  ADD_DATE,
  FETCH_FOODS,
  FETCH_ACTIVITIES,
} from "../../actionTypes/users/userActionTypes";

const initialState = {
  users: [],
  user: {},
  date: new Date().toISOString().slice(0, 10),
  foods: [],
  activities: [],
  portions: [
    { label: "1 serving", value: 1 },
    { label: "2 servings", value: 2 },
    { label: "3 servings", value: 3 },
    { label: "4 servings", value: 4 },
    { label: "5 servings", value: 5 },
    { label: "6 servings", value: 6 },
    { label: "7 servings", value: 7 },
    { label: "8 servings", value: 8 },
    { label: "9 servings", value: 9 },
    { label: "10 servings", value: 10 },
  ],
  durations: [
    { label: "10 Mins", value: 10 },
    { label: "20 Mins", value: 20 },
    { label: "30 Mins", value: 30 },
    { label: "40 Mins", value: 40 },
    { label: "50 Mins", value: 50 },
    { label: "60 Mins", value: 60 },
  ],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case FETCH_FOODS:
      return {
        ...state,
        foods: action.payload,
      };
    case FETCH_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
};

export default userReducers;
