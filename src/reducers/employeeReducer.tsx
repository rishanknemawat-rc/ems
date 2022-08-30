import { EmployeeActionTypes } from "../types/actions";
import { Employee } from "../types/Employee";

const initalEmployees: Employee[] = [
    {
        firstname: "Sherlock",
        lastname: "Homes",
        id: 102,
        manager: "xyz",
        department: "3 years"
    },
    {
        firstname: "Claire",
        lastname: "Underwood",
        id: 103,
        manager: "xyz",
        department: "12 years"
    },
    {
        firstname: "Taylor",
        lastname: "Swift",
        id: 101,
        manager: "xyz",
        department: "5 years"
    },
    {
        firstname: "Micheal",
        lastname: "Scott",
        id: 104,
        manager: "abc",
        department: "2 years"
    },
    {
        firstname: "Charlie",
        lastname: "Harper",
        id: 105,
        manager: "abc",
        department: "1 year"
    },
    {
        firstname: "Ted",
        lastname: "Mosby",
        id: 106,
        manager: "abc",
        department: "3 months"
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
                    updatedEmp.manager = action.payload.manager
                    updatedEmp.department = action.payload.department
                }

                return updatedEmp;
            });
            return updatesEmployees;

        default :   
            return employees;
    };
};

export default employeeReducer;