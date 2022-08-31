import { Employee } from "../types/Employee";
import api from "./baseAPI";
import { TOKEN } from "./baseAPI";

export const updateEmployeeAPI = (employee: Employee) => {
    api.put(`updateEmployee/${employee.id}`, 
            {
                "firstName": employee.firstName,
                "lastName": employee.lastName,
                "id": employee.id,
                "department": employee.department,
                "manager": employee.manager,
            }, 
            { headers: { "Authorization" : TOKEN } })
            .then((response: any) => {
                console.log("Employee EDITED Successfully.", response);
                alert('EMPLOYEE DETAILS UPDATED SUCCESSFULLY!');
            })
            .catch( (error: { response: any; request: any; message: any; }) => {
                if(error.response)
                    console.log("Respose Failed", error.response);
                else if(error.request)
                    console.log("Request Failed", error.request);
                else
                    console.log("ERRRR...", error.message);
            });
};