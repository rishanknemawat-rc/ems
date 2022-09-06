import { UserActionTypes } from "../types/actions";
import { User } from "../types/User";

const validUsers: User[] = [];

const addUserReducer = (users = validUsers, action: UserActionTypes) => {
    if (action.type === "ADD_USER")
        return [...users, action.payload];
    return users;
};

export default addUserReducer;