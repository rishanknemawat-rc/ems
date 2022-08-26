import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { editEmployee, selectEmployee } from "../action/index";
import { addEmployee } from "../action/index";
import { AppState } from "../reducers/index";

import { Employee } from "../types/Employee";
import { AppActions } from "../types/actions";
import { Error } from "../types/Error";

const UpdateEmployee = ({ 
    selectedEmployee, 
    employeeList,
    editEmployee,
    addEmployee,
    loggedIn
}: {
    selectedEmployee: Employee,
    employeeList: Employee[],
    editEmployee: (employee: Employee) => AppActions,
    addEmployee: (employee: Employee) => AppActions,
    loggedIn: boolean
}) => {

    // const location = useLocation();
    // const {createEmployee} = location.state;

    const initialForm: Employee = {
        firstname: selectedEmployee === null? "" : selectedEmployee.firstname,
        lastname: selectedEmployee === null? "" : selectedEmployee.lastname,
        id: selectedEmployee === null? 0 : selectedEmployee.id,
        salary: selectedEmployee === null? 0 : selectedEmployee.salary,
        manager: selectedEmployee === null? "" : selectedEmployee.manager,
        period: selectedEmployee === null? "" : selectedEmployee.period,
    };
    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            firstname: initialForm.firstname,
            lastname: initialForm.lastname,
            id: initialForm.id,
            salary: initialForm.salary,
            manager: initialForm.manager,
            period: initialForm.period,
        },
        onSubmit: (value: Employee) => {

            if(selectedEmployee === null)
                addEmployee(value);
            else{
                selectEmployee(null);
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
            }
            history.push("/");
        },
        validate: (values: Employee) => {
            const errors: Error = {};
            if (!values.firstname) {
                errors.firstname = 'Required';
            }
            if (!(/^[a-zA-Z]+$/.test(values.firstname)))
                    errors.firstname = 'Invalid First Name. Name should contain only letters';
            if (!values.lastname) {
                errors.lastname = 'Required';
            }
            if (values.lastname && !(/^[a-zA-Z]+$/.test(values.lastname)))
                    errors.lastname = 'Invalid Last Name. Name should contain only letters';
            if (!values.salary)
                errors.salary = "Required"
            if (!values.id) {
                errors.id = "Required"
            }
            if (values.id && (values.id < 100 || values.id > 999)) {
                errors.id = "Employee ID should be 3 digit number."
            }
            if (!values.manager)
                errors.manager = "Required"
            if (values.manager && !(/^[a-zA-Z]+$/.test(values.manager)))
                errors.manager = 'Invalid Manager. Manager should contain only letters';
            if (!values.period) 
                errors.period = "Required"
            
            return errors;
        }
    });

    return (
        <div>
            {loggedIn ?
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="form-group col-6">
                            <form onSubmit={formik.handleSubmit}>
                                <div className=" m-2 text-center font-weight-bold">
                                    <label className="form-label">
                                        First Name:
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="firstname"
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

                                <br />
                                <div className=" m-2 text-center font-weight-bold">
                                    <label className="form-label">
                                        Last Name:
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="lastname"
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
                                <br />
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
                                        disabled={selectedEmployee === null ? false : true}
                                    />
                                    {formik.errors.id ?
                                        <div className="text-danger">
                                            {formik.errors.id}
                                        </div> :
                                        ""
                                    }
                                </div>
                                <br />
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
                                    {formik.errors.salary ?
                                        <div className="text-danger">
                                            {formik.errors.salary}
                                        </div> :
                                        ""
                                    }
                                </div>
                                <br />
                                <div className=" m-2 text-center font-weight-bold">
                                    <label className="form-label">
                                        Manager
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text" name="manager"
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
                                <br />
                                <div className=" m-2 text-center font-weight-bold">
                                    <label className="form-label">
                                        Period
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text" name="period"
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
                                <br />
                                <div className="text-center font-weight-bold">
                                    <button
                                        className="btn btn-outline-secondary text-center m-2"
                                        type="submit">
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

export default connect(mapStateToProps, { addEmployee, editEmployee })(UpdateEmployee);