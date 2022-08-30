import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import EmployeeItem from "./EmployeeItem";
import { AppState } from "../reducers/index";
import { Employee } from "../types/Employee";

const EmployeeList = ({ employees, loggedIn, manager }: 
    { employees: Employee[], loggedIn: boolean, manager: string }) => {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<Employee[]>(employees);
    const [sort, setSort] = useState("");

    useEffect(() => {

        if (searchInput === "")
            setSearchResults(employees);

        const filteredResults = employees.filter(employee => {
            return employee.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
                employee.lastname.toLowerCase().includes(searchInput.toLowerCase());
        });

        if (sort === "firstname")
            setSearchResults(filteredResults.sort((e1, e2) => {
                if (e1.firstname.toLowerCase() <= e2.firstname.toLowerCase())
                    return -1;
                else return 1;
            }))
        else if (sort === "lastname")
        setSearchResults(filteredResults.sort((e1, e2) => {
            if (e1.lastname.toLowerCase() <= e2.lastname.toLowerCase())
                return -1;
            else return 1;
        }))
        else
            setSearchResults(filteredResults);
            
    }, [searchInput, sort, employees]);

    const renderedList = searchResults.map(employee => {
        if(employee.manager === manager){
            return (
                <div key={employee.id} className="col-4">
                    <div key={employee.id} className="list-group m-4">
                        <div key={employee.id} className="list-group-item text-center">
                            <div>
                                <EmployeeItem
                                    key={employee.id}
                                    employee={employee}
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
        <div>
            {
                loggedIn ?
                    <div>
                        <h1 className="text-center font-weight-bold m-4">
                            EMPLOYEE LIST
                        </h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-4"></div>
                                <div className="text-center col-4">
                                    <div className="form-outline">
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
                                        <div className="dropdown">
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
                                                        onClick={() => setSort("firstname")} > 
                                                        First Name 
                                                </button>
                                                <button className="dropdown-item"
                                                        onClick={() => setSort("lastname")} > 
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
                    <div className="text-center">
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
    employees: Employee[],
    loggedIn: boolean,
    manager: string
}

const mapStateToProps = (state: AppState): LinkStateProps => {
    return { employees: state.employees, loggedIn: state.loggedIn, manager: state.manager }
};

export default connect(mapStateToProps)(EmployeeList);