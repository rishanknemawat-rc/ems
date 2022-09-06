import { SetManager } from "../types/actions";

const setManager = (intitialManager = "", action: SetManager): string => {
    if (action.type === "SET_MANAGER")
        return action.payload;
    return intitialManager;
};

export default setManager;