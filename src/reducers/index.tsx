import { combineReducers } from "redux";
import selectEmployeeReducer from "./selectEmployeeReducer";
import employeeReducer from "./employeeReducer";
import addUserReducer from "./addUserReducer";
import loginReducer from "./loginReducer";
import setManager from "./setManagerReducer";

export const reducers = combineReducers({
    selectedEmployee: selectEmployeeReducer,
    employees: employeeReducer,
    users: addUserReducer,
    loggedIn: loginReducer,
    manager: setManager
});

export type AppState = ReturnType<typeof reducers>;