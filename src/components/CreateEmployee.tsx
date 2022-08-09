import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { addEmployee } from "../action/index";
import { Employee } from "../types/Employee";
import { Error } from "../types/Error";
import { AppActions } from "../types/actions";

const CreateEmployee = ({ addEmployee, loggedIn } : { addEmployee: (employee: Employee) => AppActions, loggedIn: boolean}) => {

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: "",
            id: 0,
            period: ""
        },
        onSubmit: (value: Employee) => {
            const newEmployee:Employee = {
                name: value.name,
                id: value.id,
                period: value.period
            };
            addEmployee(newEmployee);
            history.push("/");
        },
        validate: (values: Employee) => {
            const errors: Error = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (
                !(/^[a-zA-Z]+$/.test(values.name))
            ) {
                errors.name = 'Invalid Name. Name should contain only letters';
            }
            if (!values.id) {
                errors.id = "Required"
            }
            if (values.id && values.id < 100 && values.id > 999) {
                errors.id = "Employee ID should be 3 digit number."
            }
            if (!values.period) {
                errors.period = "Required"
            }
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
                                        Enter Employee Name:
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
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
                                    />
                                    {formik.errors.id ?
                                        <div className="text-danger">
                                            {formik.errors.id}
                                        </div> :
                                        ""
                                    }
                                </div>

                                <div className=" m-2 text-center font-weight-bold">
                                    <label className="form-label">
                                        Enter Employee Period
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