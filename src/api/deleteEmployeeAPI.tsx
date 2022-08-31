import api from "./baseAPI";
import { TOKEN } from "./baseAPI";

export const deleteEmployeeAPI = (id: number) => {
    api.delete(`deleteEmployee/${id}`, {
        headers: { "Authorization": TOKEN },
    })
    .then((response: any) => {
        console.log("Employee DELETED Successfully.", response);
        alert("EMPLOYEE DELETED SUCCESSFULLY!");
    })
    .catch( (error: { response: any; request: any; message: any; }) => {
        if(error.response)
            console.log("Respose Failed", error.response);
        else if(error.request)
            console.log("Request Failed", error.request);
        else
            console.log("ERROR", error.message);
    });
};