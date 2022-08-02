const selectEmployeeReducer = (selectedEmployee = null, action) => {
    if(action.type === "SELECT_EMPLOYEE")
        return action.payload;

    return selectedEmployee;
}

export default selectEmployeeReducer;