import { User } from "../types/User";
import api from "./baseAPI";
import { TOKEN } from "./baseAPI";

export const loginAPI = async ( values: User ) => {
    return await api.post("/login", {
        "username": values.username,
        "password": values.password
    },
    { headers: { "Authorization": TOKEN } })
    .then( () => { 
        alert('LOGIN SUCCESSFUL!');
    })
    .catch( (error: { response: any; request: any; message: any; }) => {
        if(error.response) console.log(error.response);
        else if(error.request) console.log(error.request);
        else console.log(error.message);
    });
};