import { User } from "../types/User";
import { Employee } from "../types/Employee";
import { AppActions } from "../types/actions";

export const selectEmployee = (employee: Employee | null) : AppActions => {
    return ({
        type: "SELECT_EMPLOYEE",
        payload: employee
    });
};

export const addEmployee = (employee: Employee): AppActions => {
    return ({
        type: "ADD_EMPLOYEE",
        payload: employee
    });
};

export const addUser = (user: User): AppActions  => {
    return ({
        type: "ADD_USER",
        payload: user
    });
};

export const editEmployee = (employee: Employee): AppActions  => {
    return ({
        type: "EDIT_EMPLOYEE",
        payload: employee
    });
};

export const deleteEmployee = (employee: Employee): AppActions  => {
    return ({
        type: "DELETE_EMPLOYEE",
        payload: employee
    });
};

export const setLogin = (loggedIn: boolean): AppActions => {
    return ({
        type: "LOGIN",
        payload: loggedIn
    });
}