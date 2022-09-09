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

        const apiRequest = `getEmployees?pageNumber=${currentPage}&pageSize=${pageLimit}&sortField=${sort}&sortDirection=${sortType}&fStr=${searchFirstName}&lStr=${searchLastName}&department=${searchDepartment}&id=${searchId}`;
        // console.log({
        //     searchFirstName, searchLastName, searchId, searchDepartment, sort, sortType, currentPage, pageLimit
        // })
        const response = await api.get(apiRequest,
        { headers: { Authorization: token } });
        return response;
}