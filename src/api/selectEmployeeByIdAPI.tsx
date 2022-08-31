import { selectEmployee } from "../action/index";
import { TOKEN } from "./baseAPI";

import { Employee } from "../types/Employee";
import api from "./baseAPI";

export const selectEmployeeById = async (employee: Employee) => {
    return await api.get(`/getEmployee/${employee.id}`, {
        headers: {  "Authorization" : TOKEN }
    })
    .then( (response: { data: { object: any; }; }) => {
        const selectedEmployee: Employee = response.data.object;
        selectEmployee(selectedEmployee);
    })
    .catch((error: any) => {
        console.log(error);
    });
}