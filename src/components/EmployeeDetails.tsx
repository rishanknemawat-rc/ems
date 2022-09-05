import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { AppState } from "../reducers/index";
import { Employee } from "../types/Employee";

import { selectEmployeeById } from "../api/selectEmployeeByIdAPI";

const EmployeeDetails = ({ token, selectedEmployee, loggedIn } : 
    { token: string, selectedEmployee: Employee | null, loggedIn: boolean, manager: string }) => {
    const params = useParams();
    selectEmployeeById(params.id, token)
    .then(response => {
        console.log("SELECTED_EMP: ", response.data);
    })
    .catch( error => {console.log(error)});

    if (!loggedIn) {
        return (
            <div data-testid="employee-details">
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
            </div>
        );
    }

    if (!selectedEmployee){
        alert("Employee with ID " + params.id + " does not exists.");
        return (
            <h1>
                Please Try Again.
            </h1>
        );
    }
    return (
        <div className="row" data-testid="employee-details-logged-in">
            <div className="col-4"></div>
            <div className="border border-secondary text-center m-5 p-4 col-4">
                <p className="font-weight-bold">
                    Full Name: {selectedEmployee.firstName} {selectedEmployee.lastName}
                </p>

                <p className="font-weight-bold">
                    Employee ID: {selectedEmployee.id}
                </p>

                <p className="font-weight-bold">
                    Manager: {selectedEmployee.manager}
                </p>

                <p className="font-weight-bold">
                    Department: {selectedEmployee.department}
                </p>

                <Link to="/getEmployees">
                    <button className="btn btn-outline-dark m-2">
                        Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

interface LinkStateProps{
    token: string,
    selectedEmployee: Employee | null,
    loggedIn: boolean
};

const mapStateToProps = (state: AppState, ownProps: any): LinkStateProps => {
    return {
        token: ownProps.token, 
        selectedEmployee: state.selectedEmployee,
        loggedIn: state.loggedIn
    };
};

export default connect(mapStateToProps)(EmployeeDetails);


    // if (!loggedIn) {
    //     alert("Employee with ID " + params.id + " does not exists.");
    //     return (
    //         <div>
    //             <div className="text-center">
    //                 <h3 className="text-center font-weight-bold m-4">
    //                     Please Login to Continue
    //                 </h3>
    //                 <Link to="/">
    //                     <button className="btn btn-outline-dark text-center m-2">
    //                         Login
    //                     </button>
    //                 </Link>
    //             </div>
    //         </div>
    //     );
    // }