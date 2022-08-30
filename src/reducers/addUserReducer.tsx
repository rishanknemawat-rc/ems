import { UserActionTypes } from "../types/actions";
import { User } from "../types/User";

const validUsers: User[]  = [
    {
        username: "abc",
        password: "abc"
    },
    {
        username: "xyz",
        password: "xyz"
    },
    {
        username: "userabc",
        password: "userabc"
    },
];

const addUserReducer = (users = validUsers, action: UserActionTypes): User[] => {
    if(action.type === "ADD_USER")
        return [...users, action.payload];
    return users;
};

export default addUserReducer;