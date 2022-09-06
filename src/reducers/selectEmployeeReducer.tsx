import { EmployeeActionTypes } from "../types/actions";
import { Employee } from "../types/Employee";

const initialSelectedEmployee: Employee | null = null;
const selectEmployeeReducer = (selectedEmployee = initialSelectedEmployee, action: EmployeeActionTypes) => {
    if (action.type === "SELECT_EMPLOYEE") {
        return action.payload;
    }
    return selectedEmployee;
}

export default selectEmployeeReducer;