import api from "./baseAPI";
import { TOKEN } from "./baseAPI";

export const getEmployeesAPI = async () => {
    return await api.get("getEmployees", { headers: { Authorization: TOKEN } })
    .then( (response: { data: { object: any; }; }) => {
            console.log("Get Employees successful.", response);
            return response.data.object;
        }
    )
    .catch( (error: any) => {console.log(error)});
}