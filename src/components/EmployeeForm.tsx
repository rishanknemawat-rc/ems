import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { AppState } from "../reducers/index";
import { AppActions } from "../types/actions";
import { addEmployee, editEmployee, selectEmployee } from "../action/index";
import { Employee } from "../types/Employee";
import { addEmployeeAPI } from "../api/addEmployeeAPI";
import { updateEmployeeAPI } from "../api/updateEmployeeAPI";
import { getEmployeeByIdAPI } from "../api/getEmployeeById";

const EmployeeForm = ({
    token,
    employees,
    selectedEmployee,
    editEmployee,
    addEmployee,
    loggedIn,
    manager
}: {
    token: string,
    employees: Employee[],
    selectedEmployee: Employee,
    editEmployee: (employee: Employee) => AppActions,
    addEmployee: (employee: Employee) => AppActions,
    loggedIn: boolean,
    manager: string
}) => {

    const initialForm: Employee = {
        firstName: selectedEmployee === null ? "" : selectedEmployee.firstName,
        lastName: selectedEmployee === null ? "" : selectedEmployee.lastName,
        id: selectedEmployee === null ? 0 : selectedEmployee.id,
        manager: selectedEmployee === null ? manager : selectedEmployee.manager,
        department: selectedEmployee === null ? "" : selectedEmployee.department,
    };

    let history = useHistory();
    function validateFirstName(value: string) {
        let error: string = "";
        if (value && !(/^[a-zA-Z]+$/.test(value)))
            error = 'Invalid First Name. Name should contain only letters';
        return error;
    }

    function validateLastName(value: string) {
        let error: string = "";
        if (value && !(/^[a-zA-Z]+$/.test(value)))
            error = 'Invalid Last Name. Name should contain only letters';
        return error;
    }

    function validateID(value: number) {
        let error: string = "";
        // const ind = employees.findIndex(employee => {
        //     return (employee.id === value);
        // });

        // if (selectedEmployee === null && ind !== -1)
        //     error = "Employee with ID " + value + " already exists.";
        // else
         if ((value < 100 || value > 999))
            error = "Employee ID should be 3 digit number."
        return error;
    }

    function validateManager(value: string) {
        let error: string = "";
        if (selectedEmployee !== null && value && !(/^[a-zA-Z]+$/.test(value)))
            error = 'Invalid Manager. Manager should contain only letters';
        return error;
    }

    function validateDepartment(value: string) {
        let error: string = "";
        if (value && !(/^[a-zA-Z]+$/.test(value)))
            error = 'Invalid Department. Department should contain only letters';
        return error;
    }
    return (
        <div>
            {loggedIn ?
                <div>
                    <h2 className="text-center font-weight-bold m-3">
                        {selectedEmployee ? "EDIT EMPLOYEE FORM": "ADD EMPLOYEE FORM"}
                    </h2>
                    <Formik
                        initialValues={{
                            firstName: initialForm.firstName,
                            lastName: initialForm.lastName,
                            id: initialForm.id === 0 ? "" : initialForm.id,
                            manager: initialForm.manager,
                            department: initialForm.department,
                        }}
                        onSubmit={(value: Employee) => {
                            
                            getEmployeeByIdAPI(value.id, token)
                            .then(response => {
                                console.log(response);
                                if (selectedEmployee === null) {
                                    // console.log(response.object);
                                    if (response.object === null) {
                                        addEmployeeAPI(value, token)
                                            .then(response => {
                                                // console.log("token: ", token);
                                                addEmployee(response.object);
                                                console.log("ADD_EMPLOYEE_SUCCESS", response);
                                                alert("EMPLOYEE ADDED SUCCESSFULLY!");
                                                history.push("/getEmployees");
                                            })
                                            .catch(error => { 
                                                alert(error.message);
                                            });
                                    }
                                    else{
                                        alert("Employee with ID " + value.id + " already exists.");
                                    }
                                }
                                else {
                                    if (response.object !== null) {
                                        selectEmployee(null);
                                        updateEmployeeAPI(value, token)
                                            .then(response => {
                                                editEmployee(value);
                                                selectEmployee(null);
                                                alert('EMPLOYEE DETAILS UPDATED SUCCESSFULLY!');
                                                console.log("Employee EDITED Successfully.", response);
                                                history.push("/getEmployees");
                                            })
                                            .catch(error => { console.log(error) });
                                    }
                                    else {
                                        selectEmployee(null);
                                        alert('EMPLOYEE NOT FOUND!)\n\n'
                                            + JSON.stringify(value, null, 3));
                                    }
                                }
                            })
                            .catch( error => console.log(error));
                            // const ind = employees.findIndex((employee: Employee) => { return (employee.id === value.id); });
                            // if (selectedEmployee === null) {
                            //     if (ind === -1) {
                            //         addEmployeeAPI(value, token)
                            //             .then(response => {
                            //                 // console.log("token: ", token);
                            //                 addEmployee(response.object);
                            //                 console.log("ADD_EMPLOYEE_SUCCESS", response);
                            //                 alert("EMPLOYEE ADDED SUCCESSFULLY!");
                            //                 history.push("/getEmployees");
                            //             })
                            //             .catch(error => { 
                            //                 alert(error.message);
                            //             });
                            //     }
                            //     else{
                            //         alert("Employee with ID " + value.id + " already exists.");
                            //     }
                            // }
                            // else {
                            //     if (ind !== -1) {
                            //         selectEmployee(null);
                            //         updateEmployeeAPI(value, token)
                            //             .then(response => {
                            //                 editEmployee(value);
                            //                 selectEmployee(null);
                            //                 // console.log("TOKEN: ",token);
                            //                 alert('EMPLOYEE DETAILS UPDATED SUCCESSFULLY!');
                            //                 console.log("Employee EDITED Successfully.", response);
                            //                 history.push("/getEmployees");
                            //             })
                            //             .catch(error => { console.log(error) });
                            //     }
                            //     else {
                            //         selectEmployee(null);
                            //         alert('NOT A VALID EMPLOYEE!! :-)\n\n'
                            //             + JSON.stringify(value, null, 3));
                            //     }
                            // }
                        }}
                    >
                        {({ errors, touched }) => (
                            <div className="container">
                                <div className="row">
                                    <div className="col-3"></div>
                                    <Form className="form-group col-6">
                                        <div className=" m-2 text-center font-weight-bold">
                                            <label htmlFor="firstName" className="form-label">
                                                First Name
                                            </label>
                                            <Field
                                                className="form-control"
                                                type="text"
                                                name="firstName"
                                                validate={validateFirstName}
                                                required
                                            />
                                            {errors.firstName && touched.firstName ?
                                                <div className="text-danger">
                                                    {errors.firstName}
                                                </div> :
                                                ""
                                            }
                                        </div> <br />

                                        <div className=" m-2 text-center font-weight-bold">
                                            <label className="form-label">
                                                Last Name
                                            </label>
                                            <Field
                                                className="form-control"
                                                type="text"
                                                name="lastName"
                                                validate={validateLastName}
                                                required
                                            />
                                            {errors.lastName && touched.lastName ?
                                                <div className="text-danger">
                                                    {errors.lastName}
                                                </div> :
                                                ""
                                            }
                                        </div> <br />

                                        <div className=" m-2 text-center font-weight-bold">
                                            <label className="form-label">
                                                Employee ID
                                            </label>
                                            <Field
                                                className="form-control"
                                                type="number"
                                                name="id"
                                                validate={validateID}
                                                disabled={selectedEmployee === null ? false : true}
                                                required
                                            />
                                            {errors.id && touched.id ?
                                                <div className="text-danger">
                                                    {errors.id}
                                                </div> :
                                                ""
                                            }
                                        </div> <br />

                                        <div className=" m-2 text-center font-weight-bold">
                                            <label className="form-label">
                                                Manager
                                            </label>
                                            <Field
                                                className="form-control"
                                                type="text" name="manager"
                                                validate={validateManager}
                                                disabled={selectedEmployee === null ? true : false}
                                                required
                                            />
                                            {errors.manager && touched.manager ?
                                                <div className="text-danger">
                                                    {errors.manager}
                                                </div> :
                                                ""
                                            }
                                        </div> <br />

                                        <div className=" m-2 text-center font-weight-bold">
                                            <label className="form-label">
                                                Department
                                            </label>
                                            <Field
                                                className="form-control"
                                                type="text" name="department"
                                                validate = {validateDepartment}
                                                required
                                            />
                                            {errors.department && touched.department ?
                                                <div className="text-danger">
                                                    {errors.department}
                                                </div> :
                                                ""
                                            }
                                        </div> <br />

                                        <div className="text-center font-weight-bold">
                                            <button
                                                className="btn btn-outline-secondary text-center m-2"
                                                type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>)}
                    </Formik>
                </div> :

                <div className="text-center" data-testid="employee-form-loggedout">
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
    token: string,
    employees: Employee[],
    selectedEmployee: Employee | null,
    loggedIn: boolean,
    manager: string
};

const mapStateToProps = (state: AppState, ownProps: any): LinkStateProps => {
    return ({
        token: ownProps.token,
        employees: state.employees,
        selectedEmployee: state.selectedEmployee,
        loggedIn: state.loggedIn,
        manager: state.manager
    })
}

export default connect(mapStateToProps, { addEmployee, editEmployee })(EmployeeForm);