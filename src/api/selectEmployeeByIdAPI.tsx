import { selectEmployee } from "../action/index";
import { TOKEN } from "./baseAPI";

import { Employee } from "../types/Employee";
import api from "./baseAPI";

export const selectEmployeeById = async (employee: Employee) => {
    const response = await api.get(`/getEmployee/${employee.id}`, {
        headers: {  "Authorization" : TOKEN }
    });
    selectEmployee(response.data.object);
    alert("Employee SELECTED inside API call", response.data.object);
    return response.data;
}

// .then( (response: { data: { object: any; }; }) => {
//     const selectedEmployee: Employee = response.data.object;
//     selectEmployee(selectedEmployee);
// })
// .catch((error: any) => {
//     console.log(error);
// });