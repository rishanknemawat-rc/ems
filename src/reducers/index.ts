import { combineReducers } from "redux";
import selectEmployeeReducer from "./selectEmployeeReducer";
import employeeReducer from "./employeeReducer";
import addUserReducer from "./addUserReducer";

export const reducers = combineReducers({
    selectedEmployee: selectEmployeeReducer,
    employees: employeeReducer,
    users: addUserReducer
});

export type AppState = ReturnType<typeof reducers>;