import { UserActionTypes } from "../types/actions";

const loginReducer = (loggedIn: boolean = false, action: UserActionTypes): boolean => {
    if (action.type === "LOGIN")
        return action.payload;
    return loggedIn;
}

export default loginReducer;