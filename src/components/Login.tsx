// This is new Login Page is using Formik!

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { setLogin } from "../action/index";
import { User } from "../types/User";
import { setManager } from "../action/index";
import { AppActions } from "../types/actions";
import { loginAPI } from "../api/loginAPI";

const Login = ({ setManager, setLogin }:
    {
        setManager: (user: string) => AppActions,
        setLogin: (loggedIn: boolean) => AppActions
    }) => {

    const history = useHistory();
    return (
        <div>
            <h1 className="text-center font-weight-bold m-3">Login</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={(values: User) => {

                    loginAPI(values)
                        .then(response => {
                            setLogin(response.object);
                            if (!response.object) {
                                alert("Not Valid Email/Password. Login Failed! Please try again.");
                            }
                            else {
                                setManager(values.username);
                                console.log("Login Successful!", response);
                                alert("LOGIN_SUCCESSFUL!");
                                history.push("/getEmployees");
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            alert("Not Valid Email/Password. Login Failed! Please try again.");
                        });
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <Form className="form-group col-6" data-testid="login-form">
                            <div className="col px-md-5">
                                <label htmlFor="username" className="form-label">Username: </label>
                                <Field id="username" name="username" placeholder="Username" className="form-control" />
                            </div>
                            <br />

                            <div className="col px-md-5">
                                <label htmlFor="password" className="form-label">Password: </label>
                                <Field id="password" name="password" placeholder="Password" type="password" className="form-control" />
                            </div>
                            <br />
                            <div className="col px-md-5 text-center">
                                <button type="submit" className="btn btn-outline-dark">Submit</button>
                            </div>
                        </Form>
                    </div>
                    <div className="text-center font-weight-bold " >
                        New User?
                        <Link to="/signup">
                            <button className="btn btn-outline-dark m-3">
                                Signup
                            </button>
                        </Link>
                    </div>
                </div>
            </Formik>
        </div>
    );
};

export default connect(null, { setLogin, setManager })(Login);