import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { addEmployee } from "../action/index";
import { Employee } from "../types/Employee";
import { Error } from "../types/Error";
import { AppActions } from "../types/actions";

const CreateEmployee = ({ addEmployee, loggedIn }: { addEmployee: (employee: Employee) => AppActions, loggedIn: boolean }) => {

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            id: 0,
            salary: 0,
            manager: "",
            period: ""
        },
        onSubmit: (value: Employee) => {
            addEmployee(value);
            history.push("/");
        },
        validate: (values: Employee) => {
            const errors: Error = {};
            if (!values.firstname) {
                errors.firstname = 'Required';
                if (!(/^[a-zA-Z]+$/.test(values.firstname)))
                    errors.firstname = 'Invalid First Name. Name should contain only letters';
            }
            if (!values.lastname) {
                errors.lastname = 'Required';
                if (!(/^[a-zA-Z]+$/.test(values.lastname)))
                    errors.lastname = 'Invalid Last Name. Name should contain only letters';
            }
            if (!values.salary)
                errors.salary = "Required"

            if (!values.id) {
                errors.id = "Required"
                if (values.id && (values.id < 100 || values.id > 999)) {
                    errors.id = "Employee ID should be 3 digit number."
                }
            }
            if (!values.manager)
                errors.manager = "Required"
            
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

export default connect(null, { addEmployee })(CreateEmployee);