import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { AppState } from "../reducers/index";
import { addUser } from "../action/index";
import { setLogin } from "../action/index";

import { User } from "../types/User";
import { AppActions } from "../types/actions";

const Signup = ({ users, addUser, setLogin }: 
                { 
                    users: User[], 
                    addUser: (user: User) => AppActions, 
                    setLogin: (loggedIn: boolean) => AppActions
                }) => {

    interface ErrorMessage {
        name?: string,
        message?: string
    }

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({name: "", message: ""});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userCreated, setUserCreated] = useState(false);

    const history = useHistory();
    const renderForm = () => {

        const handleSubmit = (event: { preventDefault: () => void; }) => {
            event.preventDefault();

            if (!email)
                setErrorMessage({ 
                    name: "email", 
                    message: "Email cannot be empty." 
                });

            if (!password)
                setErrorMessage({ 
                    name: "password", 
                    message: "Password cannot be empty." 
                });

            const password_chars = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,16}$/;
            const user = users.find(user => user.email === email);
            if (user)
                setErrorMessage({ 
                    name: "email", 
                    message: "User Already exists" 
                });
            else if (!password.match(password_chars))
                setErrorMessage({
                    name: "password",
                    message: "Password must be between 8 to 15 characters." + 
                                "Must contain special character, " +
                                "a number, a lowercase character," + 
                                " and an uppercase character."
                });
            else {
                setUserCreated(true);
                const newUser: User = {
                    email: email,
                    password: password
                };
                addUser(newUser);
                setLogin(true);
                history.push("/");
            };
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3"></div>
                    <form className="form-group col-6" onSubmit = {handleSubmit}>
                        <div className="col px-md-5">
                            <label className="form-label">
                                Enter Email Address
                            </label>
                            <input 
                                className="form-control"
                                name="email"
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <p className="text-danger">
                                {errorMessage.name === "email" ? 
                                errorMessage.message : 
                                ""}
                            </p>
                        </div>

                        <br/>
                        
                        <div className="col px-md-5">
                            <label className="form-label">
                                Enter Password
                            </label>
                            <input 
                                className="form-control"
                                name="password"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
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

                <div className="text-center font-weight-bold">
                    Already a user?
                    <Link to="/login">
                        <button className="btn btn-outline-secondary m-3">
                            Login 
                        </button>
                    </Link>
                </div>
            </div>
        );
    };



    return (
        <div>
            <h1 className="text-center font-weight-bold m-3">
                Signup Page
            </h1>
            {!userCreated ?
                renderForm() :
                <div 
                    className="alert alert-success text-center" 
                    role="alert"
                >
                    User created successfully.
                </div>
            }
        </div>
    );
};

interface LinkStateProps{
    users: User[];
}

const mapStateToProps = (state: AppState): LinkStateProps => {
    return { users: state.users }
};

export default connect(mapStateToProps, { addUser, setLogin })(Signup);