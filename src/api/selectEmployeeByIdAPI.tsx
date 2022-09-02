import { TOKEN } from "./baseAPI";
import api from "./baseAPI";

export const selectEmployeeById = async (id: number) => {
    const response = await api.get(`/getEmployee/${id}`, {
        headers: {  "Authorization" : TOKEN }
    });
    return response;
}