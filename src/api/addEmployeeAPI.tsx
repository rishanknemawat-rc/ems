import api from "./baseAPI";
import { Employee } from "../types/Employee";

export const addEmployeeAPI = async (employee: Employee, token: string) => {
    const response = await api.post("/addEmployee",
        {
            "id": employee.id,
            "firstName": employee.firstName,
            "lastName": employee.lastName,
            "department": employee.department,
            "manager": employee.manager
        },
        { headers: { "Authorization": token }, });
    return response.data;
};