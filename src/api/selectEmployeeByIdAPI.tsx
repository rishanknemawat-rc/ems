import { TOKEN } from "./baseAPI";

import { Employee } from "../types/Employee";
import api from "./baseAPI";

export const selectEmployeeById = async (employee: Employee) => {
    const response = await api.get(`/getEmployee/${employee.id}`, {
        headers: {  "Authorization" : TOKEN }
    });
    return response.data;
}