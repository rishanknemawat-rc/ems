import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { User } from "../types/User";
import { AppState } from "../reducers/index";

const Login = ({ users, handleLogin }: { users: User[], handleLogin: (event: boolean) => void}) => {

    interface ErrorMessage {
        name?: string,
        message?: string
    }

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({name: "", message: ""});
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const history = useHistory();
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const userData = users.find(user => user.email === email);

        if (!userData) {
            setErrorMessage({
                name: "email",
                message: "Email doesn't exist. New User? Signup!"
            });
        }
        else {
            if (userData.password !== password) {
                setErrorMessage({
                    name: "password",
                    message: "Invalid Password, Please try again."
                });
            }
            else {
                setSubmitted(true);
                handleLogin(true);
                history.push("/");
            }
        }

    };

    const renderForm = () => {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3"></div>
                    <form
                        className="form-group col-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="col px-md-5">
                            <label className="form-label">
                                User Email:
                            </label>
                            <input
                                className="form-control"
                                onChange={e => setUsername(e.target.value)}
                                type="email"
                                name="email"
                                required
                            />
                            <p className="text-danger">
                                {errorMessage.name === "email" ?
                                    errorMessage.message :
                                    ""}
                            </p>
                        </div>

                        <br />

                        <div className="col px-md-5">
                            <label className="form-label">
                                User Password:
                            </label>
                            <input
                                className="form-control"
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                required
                            />
                            <p className="text-danger">
                                {errorMessage.name === "password" ?
                                    errorMessage.message :
                                    ""}
                            </p>
                        </div>

                        <br />

                        <div className="col px-md-5 text-center">
                            <button
                                className="btn btn-outline-secondary"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center font-weight-bold ">
                    New User?
                    <Link to="/signup">
                        <button className="btn btn-outline-secondary m-3">
                            Signup
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-center font-weight-bold m-3">
                Login Page
            </h1>
            {submitted ?
                <div className="alert alert-success text-center" role="alert">
                    User Logged In
                </div> :
                renderForm()
            }
        </div>
    );
};

interface LinkStateProps{
    users: User[];
};

const mapStateToProps = (state: AppState): LinkStateProps => {
    return { users: state.users }
};

export default connect(mapStateToProps)(Login);

