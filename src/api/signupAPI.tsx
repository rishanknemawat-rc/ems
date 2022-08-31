import api from "./baseAPI";

export const signupAPI = (username: string, password: string) => {
    return api.post("/signup", {
        "username": username,
        "password": password
    })
    .then((response: any) => {
        console.log("Signup Success!", response);
        alert("User created Successfully.");
    })
    .catch( (error: { response: any; request: any; message: any; }) => {
        if(error.response) console.log(error.response);
        else if(error.request) console.log(error.request);
        else console.log(error.message);
    });
}