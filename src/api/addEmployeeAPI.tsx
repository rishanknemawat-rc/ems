import { Employee } from "../types/Employee";
import api from "./baseAPI"
import { TOKEN } from "./baseAPI";

export const addEmployeeAPI = async (employee: Employee) => {
    const response = await api.post("/addEmployee",
        {
            "id": employee.id,
            "firstName": employee.firstName,
            "lastName": employee.lastName,
            "department": employee.department,
            "manager": employee.manager
        },
        { headers: { "Authorization": TOKEN }, });
    return response.data;
};

// .then( (response: any) => {
//     console.log("Employee ADDED Successfully.", response);
//     alert('EMPLOYEE CREATED SUCCESSFULLY!');
// })
// .catch( (error: { response: any; request: any; message: any; }) => {
//     if(error.response)
//         console.log("Respose Failed", error.response);
//     else if(error.request)
//         console.log("Request Failed", error.request);
//     else
//         console.log("ERROR: ", error.message);
// });