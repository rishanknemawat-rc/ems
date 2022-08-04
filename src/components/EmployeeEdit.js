import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { editEmployee } from "../action";

const EmployeeEdit = ({ employeeList, selectedEmployee, editEmployee, loggedIn }) => {

    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            name: selectedEmployee.name,
            id: selectedEmployee.id,
            period: selectedEmployee.period,
        },
        onSubmit: (value) => {
            const updatedEmployee = {
                name: value.name,
                id: value.id,
                period: value.period
            };

            const ind = employeeList.findIndex(emp => {
                return (emp.id === value.id);
            });

            if (ind !== -1) {
                editEmployee(updatedEmployee);
                history.push("/");
            }
            else {
                alert('NOT A VALID EMPLOYEE!! :-)\n\n'
                    + JSON.stringify(value, null, 3));
            }
        },
        validate: values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (
                !(/^[a-zA-Z]+$/.test(values.name))
            ) {
                errors.name = 'Invalid Name. ' +
                    'Name should contain only letters';
            }
            if (!values.period) {
                errors.period = "Required"
            }
            return errors;
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
                                            Enter Employee Name:
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text" name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.name ?
                                            <div className="text-danger">
                                                {formik.errors.name}
                                            </div> :
                                            ""
                                        }
                                    </div>

                                    <div className=" m-2 text-center font-weight-bold">
                                        <label className="form-label">
                                            Enter Employee ID
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
                                            Enter Employee Period
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

const mapStateToProps = (state) => {
    return ({
        employeeList: state.employees,
        selectedEmployee: state.selectedEmployee
    });
};

export default connect(mapStateToProps, { editEmployee })(EmployeeEdit);