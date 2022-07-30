import { combineReducers } from "redux";
import signinReducer from "./signinReducer";
import selectedTabReducer from "./selectedTabReducer";

const rootReducer = combineReducers({
  signinReducer,
  selectedTabReducer,
});

export default rootReducer;
