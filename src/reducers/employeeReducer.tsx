import { EmployeeActionTypes } from "../types/actions";
import { Employee } from "../types/Employee";
import api from "../api/api";

const initalEmployees: Employee[] = [];

const employeeReducer = (employees = initalEmployees, 
                        action: EmployeeActionTypes): 
                        Employee[] => {

    switch (action.type) {
        case ("ADD_EMPLOYEE"):{
            api.post( "/addEmployee" , 
            {
                "id" : action.payload.id,
                "firstName" : action.payload.firstName,
                "lastName" : action.payload.lastName,
                "department" : action.payload.department,
                "manager" : action.payload.manager
            },
            {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : "Basic cmlzaDpyaXNo"
                },
            })
            .then( (response) => {
                console.log("Employee ADDED Successfully.", response);
                alert('EMPLOYEE CREATED SUCCESSFULLY!');
            })
            .catch( error => {
                if(error.response)
                    console.log("Respose Failed", error.response);
                else if(error.request)
                    console.log("Request Failed", error.request);
                else
                    console.log("ERRRR...", error.message);
            });
            return [...employees, action.payload];
        }

        case ("DELETE_EMPLOYEE"):{
            api.delete(`deleteEmployee/${action.payload.id}`, {
                headers: { "Authorization": "Basic cmlzaDpyaXNo" },
            })
            .then((response) => {
                console.log("Employee DELETED Successfully.", response);
                alert("EMPLOYEE DELETED SUCCESSFULLY!");
            })
            .catch( error => {
                if(error.response)
                    console.log("Respose Failed", error.response);
                else if(error.request)
                    console.log("Request Failed", error.request);
                else
                    console.log("ERRRR...", error.message);
            });
            return employees.filter(emp => emp.id !== action.payload.id);
        }

        case ("EDIT_EMPLOYEE"):{
            api.put(`updateEmployee/${action.payload.id}`, 
            {
                "firstName": action.payload.firstName,
                "lastName": action.payload.lastName,
                "id": action.payload.id,
                "department": action.payload.department,
                "manager": action.payload.manager,
            }, 
            {
                headers: { "Authorization" : "Basic cmlzaDpyaXNo" }
            })
            .then((response) => {
                console.log("Employee EDITED Successfully.", response);
                alert('EMPLOYEE DETAILS UPDATED SUCCESSFULLY!');
            })
            .catch( error => {
                if(error.response)
                    console.log("Respose Failed", error.response);
                else if(error.request)
                    console.log("Request Failed", error.request);
                else
                    console.log("ERRRR...", error.message);
            });
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