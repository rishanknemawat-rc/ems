export const selectEmployee = (employee) => {
    return ({
        type: "SELECT_EMPLOYEE",
        payload: employee
    });
};

export const addEmployee = (employee) => {
    return ({
        type: "ADD_EMPLOYEE",
        payload: employee
    });
};

export const addUser = (user) => {
    return ({
        type: "ADD_USER",
        payload: user
    });
};

export const editUser = (user) => {
    return ({
        type: "EDIT_USER",
        payload: user
    });
};

export const deleteEmployee = (employee) => {
    return ({
        type: "DELETE_EMPLOYEE",
        payload: employee
    });
};