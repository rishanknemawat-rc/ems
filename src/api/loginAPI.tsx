import api from "./baseAPI";
import { User } from "../types/User";

export const loginAPI = async (values: User, token: string) => {
    const response = await api.post("/login", {
        "username": values.username,
        "password": values.password
    },
        { headers: { "Authorization": token } });

    return response;
};