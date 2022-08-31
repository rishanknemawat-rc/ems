import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { editEmployee, selectEmployee, addEmployee } from "../action/index";
import { AppState } from "../reducers/index";

import { Employee } from "../types/Employee";
import { AppActions } from "../types/actions";
import { Error } from "../types/Error";

const UpdateEmployee = ({ 
    selectedEmployee, 
    employeeList,
    editEmployee,
    addEmployee,
    loggedIn,
    manager
}: {
    selectedEmployee: Employee,
    employeeList: Employee[],
    editEmployee: (employee: Employee) => AppActions,
    addEmployee: (employee: Employee) => AppActions,
    loggedIn: boolean,
    manager: string
}) => {

    const initialForm: Employee = {
        firstName: selectedEmployee === null? "" : selectedEmployee.firstName,
        lastName: selectedEmployee === null? "" : selectedEmployee.lastName,
        id: selectedEmployee === null? 0 : selectedEmployee.id,
        manager: selectedEmployee === null? manager : selectedEmployee.manager,
        department: selectedEmployee === null? "" : selectedEmployee.department,
    };
    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            firstName: initialForm.firstName,
            lastName: initialForm.lastName,
            id: initialForm.id,
            manager: initialForm.manager,
            department: initialForm.department,
        },
        onSubmit: (value: Employee) => {
            const ind = employeeList.findIndex(emp => {
                return (emp.id === value.id);
            });
            if(selectedEmployee === null){
                if(ind === -1){
                    addEmployee(value);
                    history.push("/getEmployees");
                }
            }
            else{
                selectEmployee(null);

                if (ind !== -1) {
                    editEmployee(value);
                    alert('EMPLOYEE DETAILS UPDATED SUCCESSFULLY!');
                    history.push("/getEmployees");
                }
                else {
                    alert('NOT A VALID EMPLOYEE!! :-)\n\n'
                        + JSON.stringify(value, null, 3));
                }
            }
        },
        validate: (values: Employee) => {

            const ind = employeeList.findIndex(emp => {
                return (emp.id === values.id);
            });

            const errors: Error = {};
            if (values.firstName && !(/^[a-zA-Z]+$/.test(values.firstName)))
                    errors.firstName = 'Invalid First Name. Name should contain only letters';
            if (values.lastName && !(/^[a-zA-Z]+$/.test(values.lastName)))
                    errors.lastName = 'Invalid Last Name. Name should contain only letters';
            if (values.id && (values.id < 100 || values.id > 999))
                errors.id = "Employee ID should be 3 digit number."
            if(selectedEmployee===null && ind !== -1)
                errors.id = "Employee with ID " + values.id + " already exists.";
            if (selectedEmployee!==null && values.manager && !(/^[a-zA-Z]+$/.test(values.manager)))
                errors.manager = 'Invalid Manager. Manager should contain only letters';
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
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    {formik.errors.firstName && formik.touched.firstName ?
                                        <div className="text-danger">
                                            {formik.errors.firstName}
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
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    {formik.errors.lastName && formik.touched.lastName?
                                        <div className="text-danger">
                                            {formik.errors.lastName}
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
                                        value={formik.values.id === 0 ? "" : formik.values.id}
                                        onChange={formik.handleChange}
                                        disabled={selectedEmployee === null? false : true}
                                        required
                                    />
                                    {formik.errors.id && formik.touched.id?
                                        <div className="text-danger">
                                            {formik.errors.id}
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
                                        disabled={selectedEmployee === null ? true : false}
                                        required
                                    />
                                    {formik.errors.manager && (selectedEmployee !== null) && formik.touched.manager?
                                        <div className="text-danger">
                                            {formik.errors.manager}
                                        </div> :
                                        ""
                                    }
                                </div>
                                <br />
                                <div className=" m-2 text-center font-weight-bold">
                                    <label className="form-label">
                                        Department
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text" name="department"
                                        value={formik.values.department}
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    {formik.errors.department && formik.touched.department ?
                                        <div className="text-danger">
                                            {formik.errors.department}
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

interface LinkStateProps{
    employeeList: Employee[],
    selectedEmployee: Employee | null,
    loggedIn: boolean,
    manager: string
};

const mapStateToProps = (state: AppState): LinkStateProps => {
    return ({
        employeeList: state.employees,
        selectedEmployee: state.selectedEmployee,
        loggedIn: state.loggedIn,
        manager: state.manager
    });
};

export default connect(mapStateToProps, { addEmployee, editEmployee })(UpdateEmployee);