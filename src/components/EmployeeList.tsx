import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import EmployeeItem from "./EmployeeItem";
import { AppState } from "../reducers/index";
import { Employee } from "../types/Employee";
import { getEmployeesAPI } from "../api/getEmployeesAPI";

const EmployeeList = ({token, employees, loggedIn, manager }:
    { token: string, employees: Employee[], loggedIn: boolean, manager: string }) => {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<Employee[]>([]);
    const [sort, setSort] = useState("");

    useEffect(() => {
        getEmployeesAPI(token)
        .then(
            (employees: Employee[]) => {
                console.log("Employees in Backend DataBase: ", employees);
                if (searchInput === "")
                    setSearchResults(employees);
        
                const filteredResults = employees.filter(employee => {
                    return employee.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                        employee.lastName.toLowerCase().includes(searchInput.toLowerCase());
                });
        
                if (sort === "firstName")
                    setSearchResults(filteredResults.sort((e1, e2) => {
                        if (e1.firstName.toLowerCase() <= e2.firstName.toLowerCase())
                            return -1;
                        else return 1;
                    }))
                else if (sort === "lastName")
                    setSearchResults(filteredResults.sort((e1, e2) => {
                        if (e1.lastName.toLowerCase() <= e2.lastName.toLowerCase())
                            return -1;
                        else return 1;
                    }))
                else
                    setSearchResults(filteredResults);
            }
        )
        .catch(error => {console.log(error)});

    }, [searchInput, sort, employees, token]);

    const renderedList = searchResults.map(employee => {
        if (employee.manager === manager) {
            return (
                <div key={employee.id} className="col-4">
                    <div key={employee.id} className="list-group m-4">
                        <div key={employee.id} className="list-group-item text-center">
                            <div>
                                <EmployeeItem
                                    key={employee.id}
                                    employee={employee}
                                    token = {token}
                                />
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            );
        }
        return null;
    });

    return (
        <div >
            {
                loggedIn ?
                    <div data-testid="employees-list">
                        <h1 className="text-center font-weight-bold m-4">
                            EMPLOYEE LIST
                        </h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-4"></div>
                                <div className="text-center col-4">
                                    <div className="form-outline" data-testid="search-box">
                                        <input id="search-input"
                                            type="search"
                                            className="form-control m-4"
                                            placeholder="Search Employee"
                                            onChange={(e) => setSearchInput(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="form-outline m-4">
                                        <div className="dropdown" data-testid="sort-box">
                                            <button className="btn btn-dark dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                Sort
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <button className="dropdown-item"
                                                    onClick={() => setSort("firstName")} >
                                                    First Name
                                                </button>
                                                <button className="dropdown-item"
                                                    onClick={() => setSort("lastName")} >
                                                    Last Name
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="conatiner">
                            <div className="row">
                                {renderedList}
                            </div>
                        </div>
                    </div> :
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
            }
        </div>
    );
};

interface LinkStateProps {
    token: string
    employees: Employee[],
    loggedIn: boolean,
    manager: string
}

const mapStateToProps = (state: AppState, ownProps: any): LinkStateProps => {
    return { 
        token: ownProps.token,
        employees: state.employees, 
        loggedIn: state.loggedIn, 
        manager: state.manager 
    }
};

export default connect(mapStateToProps)(EmployeeList);