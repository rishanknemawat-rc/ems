import api from "./baseAPI";

export const getEmployeesAPI = async (
    token: string, 
    searchFirstName: string, 
    searchLastName: string, 
    searchId: number, 
    searchDepartment: string, 
    sort: string, 
    sortType: string, 
    currentPage: number, 
    pageLimit: number ) => {

        const apiRequest = `getEmployees?pageNumber=${currentPage}&pageSize=${pageLimit}&sortField=${sort}&sortDirection=${sortType}`;
        
        const response = await api.get(apiRequest,
        { headers: { Authorization: token } });
        return response;
}