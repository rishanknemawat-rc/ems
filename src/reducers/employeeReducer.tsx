import { EmployeeActionTypes } from "../types/actions";
import { Employee } from "../types/Employee";

const initalEmployees: Employee[] = [];

const employeeReducer = (employees = initalEmployees, 
                        action: EmployeeActionTypes): 
                        Employee[] => {

    switch (action.type) {
        case ("ADD_EMPLOYEE"):{
            return [...employees, action.payload];
        }

        case ("DELETE_EMPLOYEE"):{
            return employees.filter(emp => emp.id !== action.payload.id);
        }

        case ("EDIT_EMPLOYEE"):{

            const updatesEmployees = employees.map(emp => {
                const updatedEmp = emp;
                if (emp.id === action.payload.id) {
                    updatedEmp.firstName = action.payload.firstName
                    updatedEmp.lastName = action.payload.lastName
                    updatedEmp.manager = action.payload.manager
                    updatedEmp.department = action.payload.department
                }
                return updatedEmp;
            });

            return updatesEmployees;
        }
        default :   
            return employees;
    };
};

export default employeeReducer;