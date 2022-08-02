const selectEmployeeReducer = (selectedEmployee = null, action) => {
    if(action.type === "EMPLOYEE_SELECT")
        return action.payload;

    return selectedEmployee;
}

export default selectEmployeeReducer;