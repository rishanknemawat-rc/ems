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