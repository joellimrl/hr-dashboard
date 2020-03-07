import { combineReducers } from "redux";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  notification: notificationReducer
});

export default rootReducer;
