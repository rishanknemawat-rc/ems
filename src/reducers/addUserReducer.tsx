import api from "../api/api";
import { UserActionTypes } from "../types/actions";
import { User } from "../types/User";

const validUsers: User[]  = [];

const addUserReducer = (users = validUsers, action: UserActionTypes) => {
    if(action.type === "ADD_USER"){
        api.post("/signup", {
            "username": action.payload.username,
            "password": action.payload.password
        })
        .then((res) => {
            console.log("Signin successful", res);
        })
        .catch( error => {
            if(error.response)
                console.log(error.response);
            else if(error.request)
                console.log(error.request);
            else
                console.log(error.message);
        });
        return [...users, action.payload];
    }
    return users;
};

export default addUserReducer;