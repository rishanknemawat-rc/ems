// This is new Login Page is using Formik!

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { setLogin } from "../action/index";
import { User } from "../types/User";
import { setManager } from "../action/index";
import { AppState } from "../reducers/index";
import { AppActions } from "../types/actions";
import { loginAPI } from "../api/loginAPI";

const Login = ({ users, setManager, setLogin }:
    {
        users: User[],
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
                    const user = users.find(user => user.username === values.username);
                    if (user && user.password === values.password) {

                        loginAPI(values)
                            .then(response => {
                                console.log("Login Successful!", response);
                                setLogin(true);
                                setManager(values.username);
                                alert("LOGIN_SUCCESSFUL!");
                                history.push("/getEmployees");
                            })
                            .catch( error => {console.log(error)});
                    }
                    else if (user) {
                        alert("Invalid password. Please try again.");
                    }
                    else {
                        alert("User does not exist. Please try again.");
                    }
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <Form className="form-group col-6">
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
                    <div className="text-center font-weight-bold ">
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

interface LinkStateProps {
    users: User[];
}

const mapStateToProps = (state: AppState): LinkStateProps => {
    return { users: state.users }
};

export default connect(mapStateToProps, { setLogin, setManager })(Login);