import api from "./baseAPI";

export const signupAPI = async (username: string, password: string) => {
    return await api.post("/signup", {
        "username": username,
        "password": password
    })
}