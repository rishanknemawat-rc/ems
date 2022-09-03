import api from "./baseAPI";
import { TOKEN } from "./baseAPI";

export const getEmployeesAPI = async (token: string) => {
    const response = await api.get("getEmployees", { headers: { Authorization: token } });
    return response.data.object;
}