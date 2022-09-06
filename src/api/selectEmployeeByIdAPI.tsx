import api from "./baseAPI";

export const selectEmployeeById = async (id: number, token: string) => {
    const response = await api.get(`/getEmployee/${id}`, {
        headers: { "Authorization": token }
    });
    return response;
}