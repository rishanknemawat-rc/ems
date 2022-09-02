// This is new Signup Page is using Formik!

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { User } from "../types/User";
import { addUser } from "../action/index";
import { AppState } from "../reducers/index";
import { AppActions } from "../types/actions";
import { signupAPI } from "../api/signupAPI";

const Signup = ({ users, addUser }:
    {
        users: User[],
        addUser: (user: User) => AppActions
    }) => {
    const history = useHistory();
    return (
        <div>
            <h1 className="text-center font-weight-bold m-3">Signup</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={(values: User) => {
                    if (users.find(user => user.username === values.username)) {
                        alert("User already exists. Please try again");
                    }
                    else {
                        signupAPI(values.username, values.password)
                        .then( (response: any) => {
                            addUser(values);
                            console.log(response);
                            alert("SIGNUP Successful!");
                            history.push("/");
                        })
                        .catch( error => {console.log(error)});
                    }
                }}
                validationSchema={
                    Yup.object().shape({
                        username: Yup.string()
                            .required("username required")
                            .max(15, "username should be less than 15 characters long.")
                            .matches(/^[a-zA-Z]+$/, "username must contain alphabets only."),
                        password: Yup.string()
                            .required("password required")
                            .min(3, "password should be atleast 3 characters long.")
                            .max(15, "password should be less than 15 characters long.")
                        // .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,16}$/,
                        //     "Password must contain atleast a lowercase letter, an uppercase letter, and a symbol."),
                    })
                }
            >
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <Form className="form-group col-6" data-testid="signup-form">
                            <div className="col px-md-5">
                                <label htmlFor="username" className="form-label">Username: </label>
                                <Field id="username" name="username" placeholder="Username" className="form-control" />
                                <div className="text-danger"><ErrorMessage name="username" /></div>

                            </div>
                            <br />

                            <div className="col px-md-5">
                                <label htmlFor="password" className="form-label">Password: </label>
                                <Field id="password" name="password" placeholder="Password" type="password" className="form-control" />
                                <div className="text-danger"><ErrorMessage name="password" /></div>
                            </div>
                            <br />
                            <div className="col px-md-5 text-center">
                                <button type="submit" className="btn btn-outline-dark">Submit</button>
                            </div>
                        </Form>
                    </div>

                    <div className="text-center font-weight-bold ">
                        Already a User?
                        <Link to="/">
                            <button className="btn btn-outline-secondary m-3">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </Formik>
        </div>
    );
};

interface LinkStateProps {
    users: User[];
}

const mapStateToProps = (state: AppState): LinkStateProps => {
    return { users: state.users }
};

export default connect(mapStateToProps, { addUser })(Signup);