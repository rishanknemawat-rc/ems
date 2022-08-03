import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <Link to="/" className="nav-item nav-link active m-3">Home</Link>
            <Link to="/login" className="nav-item nav-link active float-right m-3">Login</Link>
            <Link to="/signup" className="nav-item nav-link active float-right m-3">Signup</Link>
            <Link to="/new" className="nav-item nav-link active float-right m-3">Add New Employee</Link>
        </nav>
    );
};

export default Header;