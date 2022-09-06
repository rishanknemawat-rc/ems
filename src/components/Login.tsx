// This is new Login Page is using Formik!

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { User } from "../types/User";
import { AppActions } from "../types/actions";
import { setLogin } from "../action/index";
import { setManager } from "../action/index";
import { AppState } from "../reducers/index";
import { loginAPI } from "../api/loginAPI";

const Login = ({ setToken, setManager, setLogin }:
    {
        setToken: React.Dispatch<React.SetStateAction<string>>,
        setManager: (user: string) => AppActions,
        setLogin: (loggedIn: boolean) => AppActions
    }) => {

    const history = useHistory();
    return (
        <div data-testid="login-form">
            <h1 className="text-center font-weight-bold m-3">Login</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={(values: User) => {
                    const token = "Basic " + window.btoa(values.username + ":" + values.password);
                    loginAPI(values, token)
                        .then(response => {
                            setLogin(response.data.object);
                            setToken(token);
                            if (!response.data.object) {
                                alert("Not Valid Email/Password. Login Failed! Please try again.");
                            }
                            else {
                                setManager(values.username);
                                console.log("Login Successful!", response.data);
                                alert("LOGIN_SUCCESSFUL!");
                                history.push("/getEmployees");
                            }
                        })
                        .catch(error => {
                            console.log("Authentication Failed. ", error);
                            alert("Not Valid Email/Password. Authentication Failed! Please try again.");
                        });
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <Form className="form-group col-6" >
                            <div className="col px-md-5" data-testid="login-username">
                                <label htmlFor="username" className="form-label">Username: </label>
                                <Field id="username" name="username" placeholder="Username" className="form-control" />
                            </div>
                            <br />

                            <div className="col px-md-5" data-testid="login-password">
                                <label htmlFor="password" className="form-label">Password: </label>
                                <Field id="password" name="password" placeholder="Password" type="password" className="form-control" />
                            </div>
                            <br />
                            <div className="col px-md-5 text-center" data-testid="login-submit-button">
                                <button type="submit" className="btn btn-outline-dark">Submit</button>
                            </div>
                        </Form>
                    </div>
                    <div className="text-center font-weight-bold " data-testid="signup-button-option">
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

const mapStateToProps = (state: AppState, ownProps: any) => {
    return { setToken: ownProps.setToken };
}

export default connect(mapStateToProps, { setLogin, setManager })(Login);