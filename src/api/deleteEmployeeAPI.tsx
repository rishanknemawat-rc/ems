import api from "./baseAPI";

export const deleteEmployeeAPI = async (id: number, token: string) => {
    const response = await api.delete(`deleteEmployee/${id}`, {
        headers: { "Authorization": token },
    });
    return response;
};