import React from "react";

export const selectEmployee = (employee) => {
    return ({
        type: "EMPLOYEE_SELECT",
        payload: employee
    });
    
};