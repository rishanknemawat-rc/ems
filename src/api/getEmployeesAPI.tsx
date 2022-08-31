import api from "./baseAPI";
import { TOKEN } from "./baseAPI";

export const getEmployeesAPI = async () => {
    const response = await api.get("getEmployees", { headers: { Authorization: TOKEN } })
    return response.data.object;
}