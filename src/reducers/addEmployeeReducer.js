const initalEmployees = [
    {
        name: "emp-1",
        id: "101",
        period: "1 year"
    },
    {
        name: "emp-2",
        id: "102",
        period: "1.5 year"
    },
    {
        name: "emp-3",
        id: "103",
        period: "2 year"
    }
];

const addEmployeeReducer = (employees = initalEmployees, action) => {
    if(action.type === "ADD_EMPLOYEE")
        return [...employees, action.payload];
    
    return employees;
};

export default addEmployeeReducer;