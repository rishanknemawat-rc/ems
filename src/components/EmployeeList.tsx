import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SearchBox from "./SearchBox";
import Pagination from "./Pagination";

import { Employee } from "../types/Employee";
import { AppState } from "../reducers/index";
import { getEmployeesAPI } from "../api/getEmployeesAPI";
import EmployeeTable from "./EmployeeTable";

const EmployeeList = ({
    token,
    employees,
    loggedIn,
    manager,
    searchFirstName, 
    searchLastName, 
    searchId, 
    searchDepartment, 
    sort, 
    sortType, 
    currentPage, 
    pageLimit,
    totalCount,
    setSearchFirstName,
    setSearchLastName,
    setSearchId,
    setSearchDepartment,
    setSort,
    setSortType,
    setCurrentPage,
    setPageLimit,
    setTotalCount
}: {
    token: string;
    employees: Employee[];
    loggedIn: boolean;
    manager: string;
    searchFirstName: string, 
    searchLastName: string, 
    searchId: number, 
    searchDepartment: string, 
    sort: string, 
    sortType: string, 
    currentPage: number, 
    pageLimit: number,
    totalCount: number,
    setSearchFirstName: React.Dispatch<React.SetStateAction<string>>,
    setSearchLastName: React.Dispatch<React.SetStateAction<string>>,
    setSearchId: React.Dispatch<React.SetStateAction<number>>,
    setSearchDepartment: React.Dispatch<React.SetStateAction<string>>,
    setSort: React.Dispatch<React.SetStateAction<string>>,
    setSortType: React.Dispatch<React.SetStateAction<string>>,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setPageLimit: React.Dispatch<React.SetStateAction<number>>,
    setTotalCount: React.Dispatch<React.SetStateAction<number>>
}) => {
    // const [searchFirstName, setSearchFirstName] = useState("");
    // const [searchLastName, setSearchLastName] = useState("");
    // const [searchId, setSearchId] = useState(0);
    // const [searchDepartment, setSearchDepartment] = useState("");
    // const [sort, setSort] = useState("");
    // const [sortType, setSortType] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pageLimit, setPageLimit] = useState(5);
    // const [totalCount, setTotalCount] = useState(0);
    const [searchResults, setSearchResults] = useState<Employee[]>([]);

    useEffect(() => {
        getEmployeesAPI(token, searchFirstName, searchLastName, 
                        searchId, searchDepartment, sort, 
                        sortType, currentPage, pageLimit)
            .then((response: any) => {
                // console.log("current page: ",currentPage);
                // console.log("getEmployees", response);
                // console.log("Employees in Backend DataBase: ", response.data.data.content);
                setTotalCount(response.data.data.totalPages);
                setSearchResults(response.data.data.content);
                if(response.data.data.totalPages>0 && currentPage > response.data.data.totalPages)
                    setCurrentPage(1);
            })
            .catch((error) => {  console.log(error); });
    }, [
        searchFirstName,
        searchLastName,
        searchId,
        searchDepartment,
        sort,
        sortType,
        employees,
        currentPage,
        pageLimit,
        token,
    ]);


    return (
        <div>
            {loggedIn ? (
                <div data-testid="employees-list">
                    <h1 className="text-center font-weight-bold m-4">EMPLOYEE LIST</h1>
                    <div>
                        <SearchBox
                            setSearchFirstName={setSearchFirstName}
                            setSearchLastName={setSearchLastName}
                            setSearchId={setSearchId}
                            setSearchDepartment={setSearchDepartment}
                            setSort={setSort}
                            setSortType={setSortType}
                        />
                    </div>
                    <div>
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setPageLimit={setPageLimit}
                            pageLimit={pageLimit}
                            totalCount={totalCount}
                        />
                    </div>
                    <div>
                        <EmployeeTable employees={searchResults} token={token} currentPage={currentPage} pageLimit={pageLimit}/>
                    </div>
                </div>
            ) : (
                <div className="text-center" data-testid="employees-list-logout">
                    <h3 className="text-center font-weight-bold m-4">
                        Please Login to Continue
                    </h3>
                    <Link to="/">
                        <button className="btn btn-outline-dark text-center m-2">
                            Login
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

interface LinkStateProps {
    token: string;
    employees: Employee[];
    loggedIn: boolean;
    manager: string;
    searchFirstName: string, 
    searchLastName: string, 
    searchId: number, 
    searchDepartment: string, 
    sort: string, 
    sortType: string, 
    currentPage: number, 
    pageLimit: number,
    totalCount: number,
    setSearchFirstName: React.Dispatch<React.SetStateAction<string>>,
    setSearchLastName: React.Dispatch<React.SetStateAction<string>>,
    setSearchId: React.Dispatch<React.SetStateAction<number>>,
    setSearchDepartment: React.Dispatch<React.SetStateAction<string>>,
    setSort: React.Dispatch<React.SetStateAction<string>>,
    setSortType: React.Dispatch<React.SetStateAction<string>>,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setPageLimit: React.Dispatch<React.SetStateAction<number>>,
    setTotalCount: React.Dispatch<React.SetStateAction<number>>
}

const mapStateToProps = (state: AppState, ownProps: any): LinkStateProps => {
    return {
        token: ownProps.token,
        employees: state.employees,
        loggedIn: state.loggedIn,
        manager: state.manager,
        searchFirstName: ownProps.searchFirstName, 
        searchLastName: ownProps.searchLastName, 
        searchId: ownProps.searchId,
        searchDepartment: ownProps.searchDepartment,
        sort: ownProps.sort,
        sortType: ownProps.sortType,
        currentPage: ownProps.currentPage,
        pageLimit: ownProps.pageLimit,
        totalCount: ownProps.totalCount,
        setSearchFirstName: ownProps.setSearchFirstName,
        setSearchLastName: ownProps.setSearchLastName,
        setSearchId: ownProps.setSearchId,
        setSearchDepartment: ownProps.setSearchDepartment,
        setSort: ownProps.setSort,
        setSortType: ownProps.setSortType,
        setCurrentPage: ownProps.setCurrentPage,
        setPageLimit: ownProps.setPageLimit,
        setTotalCount: ownProps.setTotalCount,
    };
};

export default connect(mapStateToProps)(EmployeeList);