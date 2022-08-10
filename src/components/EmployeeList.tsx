import React, { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../reducers/index";
import { Employee } from "../types/Employee";

import EmployeeItem from "./EmployeeItem";

const EmployeeList = ({ employees, loggedIn }: { employees: Employee[], loggedIn: boolean }) => {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<Employee[]>(employees);

    useEffect(() => {
        console.log(searchInput);
        if (searchInput === "")
            setSearchResults(employees);

        const filteredResults = employees.filter(employee => {
            return employee.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
                employee.lastname.toLowerCase().includes(searchInput.toLowerCase());
        });

        setSearchResults(filteredResults);
    }, [searchInput]);

    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setSearchInput(event.target.value);
    //     console.log(searchInput);
    // }

    const renderedList = searchResults.map(employee => {
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
                        <Link to="/login">
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
    employees: Employee[]
}

const mapStateToProps = (state: AppState): LinkStateProps => {
    return { employees: state.employees }
};

export default connect(mapStateToProps)(EmployeeList);