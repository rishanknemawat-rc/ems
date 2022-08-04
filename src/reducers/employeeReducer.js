const initalEmployees = [
    {
        name: "John",
        id: 102,
        period: "3 years"
    },
    {
        name: "Claire",
        id: 103,
        period: "2.5 years"
    },
    {
        name: "Emily",
        id: 101,
        period: "5 years"
    },
    {
        name: "Dylan",
        id: 104,
        period: "2 years"
    },
    {
        name: "Emma",
        id: 105,
        period: "1 year"
    },
    {
        name: "Kraig",
        id: 103,
        period: "3 months"
    },
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

    if(action.type === "EDIT_EMPLOYEE"){
        const updatesEmployees = employees.map(emp => {
            const updatedEmp = emp;
            if(emp.id === action.payload.id)
            {
                updatedEmp.name = action.payload.name
                updatedEmp.period = action.payload.period;
            }

            return updatedEmp;
        });

        return updatesEmployees;
    }

    return employees;
};

export default employeeReducer;