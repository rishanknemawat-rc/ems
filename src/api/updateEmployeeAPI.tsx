import { Employee } from "../types/Employee";
import api from "./baseAPI";
import { TOKEN } from "./baseAPI";

export const updateEmployeeAPI = async (employee: Employee) => {
    const response = await api.put(`updateEmployee/${employee.id}`,
        {
            "firstName": employee.firstName,
            "lastName": employee.lastName,
            "id": employee.id,
            "department": employee.department,
            "manager": employee.manager,
        },
        { headers: { "Authorization": TOKEN } });

    return response.data;
};