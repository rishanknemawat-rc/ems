import { User } from "../types/User";
import api from "./baseAPI";
import { TOKEN } from "./baseAPI";

export const loginAPI = async ( values: User ) => {
    const response = await api.post("/login", {
        "username": values.username,
        "password": values.password
    },
    { headers: { "Authorization": TOKEN } });

    return response.data;
};