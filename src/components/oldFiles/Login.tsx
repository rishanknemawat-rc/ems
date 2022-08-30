import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { setLogin } from "../../action/index";
import { setManager } from "../../action/index";
import { User } from "../../types/User";
import { AppState } from "../../reducers/index";
import { AppActions } from "../../types/actions";

const Login = ({ users, setLogin, setManager }: 
    { users: User[], setLogin: (loggedIn: boolean) => AppActions, setManager: (manager: string) => AppActions}) => {

    interface ErrorMessage {
        name?: string,
        message?: string
    }

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({name: "", message: ""});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const history = useHistory();
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const userData = users.find(user => user.username === username);

        if (!userData) {
            setErrorMessage({
                name: "username",
                message: "User doesn't exist. New User? Signup!"
            });
        }
        else {
            if (userData.password !== password) {
                setErrorMessage({
                    name: "password",
                    message: "Invalid Password. Please try again."
                });
            }
            else {
                setSubmitted(true);
                setLogin(true);
                setManager(username);
                alert('LOGIN SUCCESSFUL!');
                history.push("/getEmployees");
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
                                Username:
                            </label>
                            <input
                                className="form-control"
                                onChange={e => setUsername(e.target.value)}
                                type="text"
                                name="username"
                                required
                            />
                            <p className="text-danger">
                                {errorMessage.name === "username" ?
                                    errorMessage.message :
                                    ""}
                            </p>
                        </div>

                        <br />

                        <div className="col px-md-5">
                            <label className="form-label">
                                Password:
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
                    Login Successful.
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

export default connect(mapStateToProps, { setLogin, setManager })(Login);

