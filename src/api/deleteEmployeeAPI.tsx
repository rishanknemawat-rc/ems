import api from "./baseAPI";
import { TOKEN } from "./baseAPI";

export const deleteEmployeeAPI = async (id: number) => {
    const response = await api.delete(`deleteEmployee/${id}`, {
        headers: { "Authorization": TOKEN },
    });
    return response.data;
};