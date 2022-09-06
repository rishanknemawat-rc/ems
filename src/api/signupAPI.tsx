import api from "./baseAPI";

export const signupAPI = async (username: string, password: string) => {
    const response = await api.post("/signup", {
        "username": username,
        "password": password
    });

    return response;
}