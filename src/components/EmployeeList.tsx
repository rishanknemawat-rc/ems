import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import EmployeeItem from "./EmployeeItem";
import { getEmployeesAPI } from "../api/getEmployeesAPI";
import { AppState } from "../reducers/index";
import { Employee } from "../types/Employee";

const EmployeeList = ({employees, loggedIn, manager }:
    { employees: Employee[], loggedIn: boolean, manager: string }) => {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<Employee[]>([]);
    const [sort, setSort] = useState("");

    useEffect(() => {

        getEmployeesAPI()
        .then(
            (employees: Employee[]) => {
                console.log("EMP LIST: ", employees);
            }
        )
        .catch(error => {console.log(error)});

        if (searchInput === "") {
            setSearchResults(employees);
        }

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

    }, [searchInput, sort, employees]);

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
    return { 
        employees: state.employees, 
        loggedIn: state.loggedIn, 
        manager: state.manager 
    }
};

export default connect(mapStateToProps)(EmployeeList);



        // const response = api.get("/getEmployeesAPI",
        //     {
        //         headers: { 
        //             Authorization: "Basic dHVzaDp0dXNo" 
        //         }
        //     })
        //     .then( (response) => {
                // console.log("Get Employees successful.", response);
                // console.log("Employees List Array: ", response.data.object);
        //         data = response.data.object;
        //     })
        //     .catch( error => {
        //         if(error.response)
        //             console.log(error.response);
        //         else if(error.request)
        //             console.log(error.request);
        //         else
        //             console.log(error.message);
        //         return error;
        //     });


        // ---------------------------------------------------

                

        // if (searchInput === "") {
        //     setSearchResults(employees);
        // }

        // const filteredResults = employees.filter(employee => {
        //     return employee.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        //         employee.lastName.toLowerCase().includes(searchInput.toLowerCase());
        // });

        // if (sort === "firstName")
        //     setSearchResults(filteredResults.sort((e1, e2) => {
        //         if (e1.firstName.toLowerCase() <= e2.firstName.toLowerCase())
        //             return -1;
        //         else return 1;
        //     }))
        // else if (sort === "lastName")
        //     setSearchResults(filteredResults.sort((e1, e2) => {
        //         if (e1.lastName.toLowerCase() <= e2.lastName.toLowerCase())
        //             return -1;
        //         else return 1;
        //     }))
        // else
        //     setSearchResults(filteredResults);


    // async function getEmployeesAPIArray() {

    //     try {
    //         const response = await api.get("/getEmployeesAPI",
    //         {
    //             headers: {
    //                 Authorization: "Basic cmlzaDpyaXNo"
    //             }
    //         });
    //         console.log("Get Employees successful.", response);
    //         console.log("Employees List Array: ", response.data.object);
    //         return response.data.object;
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // };