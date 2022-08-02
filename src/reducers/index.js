import { combineReducers } from "redux";
import selectEmployeeReducer from "./selectEmployeeReducer";
import addEmployeeReducer from "./addEmployeeReducer";

export default combineReducers({
    selectEmployee: selectEmployeeReducer,
    addEmployee: addEmployeeReducer
});