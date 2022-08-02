import { combineReducers } from "redux";
import selectEmployeeReducer from "./selectEmployeeReducer";
import addEmployeeReducer from "./addEmployeeReducer";
import addUserReducer from "./addUserReducer";

export default combineReducers({
    selectedEmployee: selectEmployeeReducer,
    addEmployee: addEmployeeReducer,
    users: addUserReducer
});