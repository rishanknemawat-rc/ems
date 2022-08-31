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