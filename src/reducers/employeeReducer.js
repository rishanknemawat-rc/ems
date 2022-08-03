const initalEmployees = [
    {
        name: "emp-1",
        id: 101,
        period: "1 year"
    },
    {
        name: "emp-2",
        id: 102,
        period: "1.5 year"
    },
    {
        name: "emp-3",
        id: 103,
        period: "2 year"
    }
];

const employeeReducer = (employees = initalEmployees, action) => {
    if(action.type === "ADD_EMPLOYEE")
        return [...employees, action.payload];

    if(action.type === "DELETE_EMPLOYEE"){
        function getEmp(obj){
            return obj.id !== action.payload.id;
        };
        return employees.filter(getEmp);
    }
    return employees;
};

export default employeeReducer;