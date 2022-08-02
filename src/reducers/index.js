import { combineReducers } from "redux";
import selectEmployeeReducer from "./selectEmployeeReducer";

export default combineReducers({
    selectEmployee: selectEmployeeReducer
});