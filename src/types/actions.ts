import { Employee } from "./Employee";
import { User } from "./User";

export const SELECT_EMPLOYEE = "SELECT_EMPLOYEE";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const ADD_USER = "ADD_USER";
export const LOGIN = "LOGIN";

export interface SetSelectEmployeeAction {
    type: typeof SELECT_EMPLOYEE;
    payload: Employee | null;
}

export interface SetAddEmployeeAction {
    type: typeof ADD_EMPLOYEE;
    payload: Employee;
}

export interface SetEditEmployeeAction {
    type: typeof EDIT_EMPLOYEE;
    payload: Employee;
}

export interface SetDeleteEmployeeAction {
    type: typeof DELETE_EMPLOYEE;
    payload: Employee;
}

export interface SetAddUserAction {
    type: typeof ADD_USER;
    payload: User;
}

export interface SetLogin {
    type: typeof LOGIN;
    payload: boolean;
}

export type EmployeeActionTypes = SetSelectEmployeeAction | SetAddEmployeeAction | SetEditEmployeeAction
                                    | SetDeleteEmployeeAction;

export type UserActionTypes = SetAddUserAction | SetLogin;


export type AppActions = EmployeeActionTypes | UserActionTypes;