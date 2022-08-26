import { combineReducers } from "redux";
import selectEmployeeReducer from "./selectEmployeeReducer";
import employeeReducer from "./employeeReducer";
import addUserReducer from "./addUserReducer";
import loginReducer from "./loginReducer";

export const reducers = combineReducers({
    selectedEmployee: selectEmployeeReducer,
    employees: employeeReducer,
    users: addUserReducer,
    loggedIn: loginReducer
});

export type AppState = ReturnType<typeof reducers>;