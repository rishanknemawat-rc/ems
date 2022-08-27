import { EmployeeActionTypes } from "../types/actions";
import { Employee } from "../types/Employee";

const initalEmployees: Employee[] = [
    {
        firstname: "Sherlock",
        lastname: "Homes",
        id: 102,
        salary: 50000,
        manager: "xyz",
        period: "3 years"
    },
    {
        firstname: "Claire",
        lastname: "Underwood",
        id: 103,
        salary: 60000,
        manager: "xyz",
        period: "12 years"
    },
    {
        firstname: "Taylor",
        lastname: "Swift",
        id: 101,
        salary: 20000,
        manager: "xyz",
        period: "5 years"
    },
    {
        firstname: "Micheal",
        lastname: "Scott",
        id: 104,
        salary: 80000,
        manager: "abc",
        period: "2 years"
    },
    {
        firstname: "Charlie",
        lastname: "Harper",
        id: 105,
        salary: 10000,
        manager: "abc",
        period: "1 year"
    },
    {
        firstname: "Ted",
        lastname: "Mosby",
        id: 106,
        salary: 15500,
        manager: "abc",
        period: "3 months"
    },
];

const employeeReducer = (employees = initalEmployees, 
                        action: EmployeeActionTypes): 
                        Employee[] => {

    switch (action.type) {
        case ("ADD_EMPLOYEE"):
            return [...employees, action.payload];

        case ("DELETE_EMPLOYEE"):
            return employees.filter(emp => emp.id !== action.payload.id);

        case ("EDIT_EMPLOYEE"):
            const updatesEmployees = employees.map(emp => {
                const updatedEmp = emp;
                if (emp.id === action.payload.id) {
                    updatedEmp.firstname = action.payload.firstname
                    updatedEmp.lastname = action.payload.lastname
                    updatedEmp.salary = action.payload.salary
                    updatedEmp.manager = action.payload.manager
                    updatedEmp.period = action.payload.period
                }

                return updatedEmp;
            });
            return updatesEmployees;

        default :   
            return employees;
    };
};

export default employeeReducer;