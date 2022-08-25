import { EmployeeActionTypes } from "../types/actions";
import { Employee } from "../types/Employee";

const initalEmployees: Employee[] = [
    {
        firstname: "John",
        lastname: "Lison",
        id: 102,
        salary: 50000,
        manager: "Mark",
        period: "3 years"
    },
    {
        firstname: "Claire",
        lastname: "Underwood",
        id: 103,
        salary: 60000,
        manager: "Mark",
        period: "2.5 years"
    },
    {
        firstname: "John",
        lastname: "Willow",
        id: 101,
        salary: 20000,
        manager: "Mark",
        period: "5 years"
    },
    {
        firstname: "Michael",
        lastname: "Underwale",
        id: 104,
        salary: 80000,
        manager: "Mark",
        period: "2 years"
    },
    {
        firstname: "Rachel",
        lastname: "Waffle",
        id: 105,
        salary: 10000,
        manager: "Mark",
        period: "1 year"
    },
    {
        firstname: "Jake",
        lastname: "Weinstein",
        id: 106,
        salary: 15500,
        manager: "Mark",
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