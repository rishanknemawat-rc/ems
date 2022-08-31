import { EmployeeActionTypes } from "../types/actions";
import { Employee } from "../types/Employee";
import { addEmployeeAPI } from "../api/addEmployeeAPI";
import { deleteEmployeeAPI } from "../api/deleteEmployeeAPI";
import { updateEmployeeAPI } from "../api/updateEmployeeAPI";

const initalEmployees: Employee[] = [];

const employeeReducer = (employees = initalEmployees, 
                        action: EmployeeActionTypes): 
                        Employee[] => {

    switch (action.type) {
        case ("ADD_EMPLOYEE"):{
            addEmployeeAPI(action.payload);
            return [...employees, action.payload];
        }

        case ("DELETE_EMPLOYEE"):{
            deleteEmployeeAPI(action.payload.id);
            return employees.filter(emp => emp.id !== action.payload.id);
        }

        case ("EDIT_EMPLOYEE"):{
            updateEmployeeAPI(action.payload);
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