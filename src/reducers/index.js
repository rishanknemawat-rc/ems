import { combineReducers } from "redux";
import selectEmployeeReducer from "./selectEmployeeReducer";
import addEmployeeReducer from "./addEmployeeReducer";

export default combineReducers({
    selectedEmployee: selectEmployeeReducer,
    addEmployee: addEmployeeReducer
});