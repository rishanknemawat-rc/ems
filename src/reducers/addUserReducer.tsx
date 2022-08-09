import { UserActionTypes } from "../types/actions";
import { User } from "../types/User";

const validUsers: User[]  = [
    {
        email: "user1@xyz",
        password: "pass1"
    },
    {
        email: "user2@xyz",
        password: "pass2"
    },
    {
        email: "user3@xyz",
        password: "pass3"
    },
];

const addUserReducer = (users = validUsers, action: UserActionTypes): User[] => {
    if(action.type === "ADD_USER")
        return [...users, action.payload];
    return users;
};

export default addUserReducer;