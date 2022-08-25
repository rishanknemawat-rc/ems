import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { editEmployee } from "../action/index";
import { AppState } from "../reducers/index";

import { Employee } from "../types/Employee";
import { AppActions } from "../types/actions";
import { Error } from "../types/Error";

const EmployeeEdit = ({ employeeList, selectedEmployee, editEmployee, loggedIn }
    : { employeeList : Employee[], 
        selectedEmployee: Employee, 
        editEmployee: (employee: Employee) => AppActions, 
        loggedIn: boolean}) => {

    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            firstname: selectedEmployee.firstname,
            lastname: selectedEmployee.lastname,
            id: selectedEmployee.id,
            salary: selectedEmployee.salary,
            manager: selectedEmployee.manager,
            period: selectedEmployee.period,
        },
        onSubmit: (value: Employee) => {

            const ind = employeeList.findIndex(emp => {
                return (emp.id === value.id);
            });

            if (ind !== -1) {
                editEmployee(value);
                history.push("/");
            }
            else {
                alert('NOT A VALID EMPLOYEE!! :-)\n\n'
                    + JSON.stringify(value, null, 3));
            }
        },
        validate: (value: Employee) => {
            const error: Error = {};
            if (!value.firstname) {
                error.firstname = 'Required';
                if (!(/^[a-zA-Z]+$/.test(value.firstname))) {
                    error.firstname = 'Invalid first name. ' +
                        'Name should contain only letters';
                }
            }
            if (!value.lastname) {
                error.lastname = 'Required';
                if (!(/^[a-zA-Z]+$/.test(value.lastname))) {
                    error.lastname = 'Invalid last name. ' +
                        'Name should contain only letters';
                }
            }
            
            if (!value.salary) 
                error.salary = "Required"

            if (!value.manager)
                error.manager = "Required"
            
            if (!value.period) 
                error.period = "Required"
            
            return error;
        }
    });
    return (
        <div>
            {
                loggedIn ?
                    <div className="container">
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="form-group col-6">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className=" m-2 text-center font-weight-bold">
                                        <label className="form-label">
                                            First name
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text" name="firstname"
                                            value={formik.values.firstname}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.firstname ?
                                            <div className="text-danger">
                                                {formik.errors.firstname}
                                            </div> :
                                            ""
                                        }
                                    </div>

                                    <div className=" m-2 text-center font-weight-bold">
                                        <label className="form-label">
                                            Last name
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text" name="lastname"
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.lastname ?
                                            <div className="text-danger">
                                                {formik.errors.lastname}
                                            </div> :
                                            ""
                                        }
                                    </div>

                                    <div className=" m-2 text-center font-weight-bold">
                                        <label className="form-label">
                                            Employee ID
                                        </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="id"
                                            value={formik.values.id}
                                            onChange={formik.handleChange}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className=" m-2 text-center font-weight-bold">
                                        <label className="form-label">
                                            Salary
                                        </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="salary"
                                            value={formik.values.salary}
                                            onChange={formik.handleChange}
                                        />
                                    </div>

                                    <div className=" m-2 text-center font-weight-bold">
                                        <label className="form-label">
                                            Manager
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="manager"
                                            value={formik.values.manager}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.manager ?
                                            <div className="text-danger">
                                                {formik.errors.manager}
                                            </div> :
                                            ""
                                        }
                                    </div>

                                    <div className=" m-2 text-center font-weight-bold">
                                        <label className="form-label">
                                            Period
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="period"
                                            value={formik.values.period}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.period ?
                                            <div className="text-danger">
                                                {formik.errors.period}
                                            </div> :
                                            ""
                                        }
                                    </div>
                                    <div className="text-center font-weight-bold">
                                        <button
                                            className="btn btn-outline-secondary text-center m-2"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
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

interface LinkStateProps{
    employeeList: Employee[],
    selectedEmployee: Employee | null
};

const mapStateToProps = (state: AppState): LinkStateProps => {
    return ({
        employeeList: state.employees,
        selectedEmployee: state.selectedEmployee
    });
};

export default connect(mapStateToProps, { editEmployee })(EmployeeEdit);