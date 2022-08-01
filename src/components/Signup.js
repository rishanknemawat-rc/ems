import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({ users }) => {
    const [errorMessage, setErrorMessage] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userCreated, setUserCreated] = useState(false);

    const renderForm = () => {

        const handleSubmit = (event) => {
            event.preventDefault();

            if (!email)
                setErrorMessage({ name: "email", message: "Email cannot be empty." });

            if (!password)
                setErrorMessage({ name: "password", message: "Password cannot be empty." });

            const password_chars = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
            const user = users.find(user => user.email === email);
            if (user)
                setErrorMessage({name: "email", message: "User Already exists"});
            else if (!password.match(password_chars))
                setErrorMessage({
                    name: "password",
                    message: "Password must be between 8 to 15 characters. Must contain special character, " +
                        "a number, a lowercase character, and an uppercase character"
                });
            else {
                setUserCreated(true);
                users.push({
                    email: email,
                    password: password
                });
            };
        }

        return (
            <div>
                <form className="form-group" onSubmit={handleSubmit}>
                    <div className="col px-md-5">
                        <label className="form-label">Enter Email Address</label>
                        <input className="form-control"
                            name="email"
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <p>{errorMessage.name === "email" ? errorMessage.message : ""}</p>
                    </div>
                    <div className="col px-md-5">
                        <label className="form-label">Enter Password</label>
                        <input className="form-control"
                            name="password"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <p>{errorMessage.name === "password" ? errorMessage.message : ""}</p>
                    </div>
                    <br />
                    <div className="col px-md-5 text-center">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
                <br />
                <div className="text-center font-weight-bold">
                    Already a user?
                    <Link to="/login">
                    <button className="btn btn-primary"> Login </button>
                    </Link>
                </div>
            </div>
        );
    };



    return (
        <div>
            <h1 className="text-center font-weight-bold">Signup Page</h1>
            {!userCreated ?
                renderForm() :
                <div className="alert alert-success text-center" role="alert">
                    User created successfully.
                </div>
            }
        </div>
    );
};



export default Signup;