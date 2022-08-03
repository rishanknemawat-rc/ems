import { combineReducers } from "redux";
import selectEmployeeReducer from "./selectEmployeeReducer";
import employeeReducer from "./employeeReducer";
import addUserReducer from "./addUserReducer";

export default combineReducers({
    selectedEmployee: selectEmployeeReducer,
    employees: employeeReducer,
    users: addUserReducer
});