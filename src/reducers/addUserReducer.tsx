import { signupAPI } from "../api/signupAPI";
import { UserActionTypes } from "../types/actions";
import { User } from "../types/User";

const validUsers: User[]  = [];

const addUserReducer = (users = validUsers, action: UserActionTypes) => {
    if(action.type === "ADD_USER"){
        signupAPI(action.payload.username, action.payload.password);
        return [...users, action.payload];
    }
    return users;
};

export default addUserReducer;