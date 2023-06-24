import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducers from "../reducers/users/userReducers";
import helperReducers from "../reducers/helpers/helperReducers";

const rootReducer = combineReducers({
  userReducers,
  helperReducers,
});

// Enable Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
