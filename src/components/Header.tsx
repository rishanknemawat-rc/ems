import React from "react";
import { Link } from "react-router-dom";

const Header = ({ loggedIn, handleLogin }: { loggedIn: boolean, handleLogin: (event: boolean) => void})  => {

    const handleLogout = () => {
        handleLogin(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="nav-item nav-link active m-1">
                <button className="btn btn-outline-dark">Home</button>
            </Link>
            <Link to="/new" className="nav-item nav-link active float-right m-1">
                <button className="btn btn-outline-dark">Add New Employee</button>
            </Link>
            {
                loggedIn ?
                    <div className="nav-item nav-link active m-1">
                        <Link to="/login">
                            <button className="btn btn-outline-dark float-right" onClick={handleLogout}>
                                Logout
                            </button>
                        </Link>
                    </div> :
                    <div className="nav-item nav-link active m-3">
                        <div className="row">
                            <div className="col-4">
                                <Link to="/login" className="item nav-link active float-right m-3">
                                    <button className="btn btn-outline-dark" type="submit">
                                        Login
                                    </button>
                                </Link>
                            </div>
                            <div className="col-4">
                                <Link to="/signup" className="item nav-link active float-right m-3">
                                    <button className="btn btn-outline-dark" type="submit">
                                        Signup
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
            }
        </nav>
    );
};

export default Header;