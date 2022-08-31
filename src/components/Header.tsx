import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import { selectEmployee, setLogin } from "../action/index";
import { Employee } from "../types/Employee";
import { AppState } from "../reducers/index";

const Header = ({ loggedIn, setLogin, selectEmployee} : 
    { loggedIn: boolean, 
        setLogin: (login: boolean) => void, 
        selectEmployee: (employee: Employee| null) => AppState
    })  => {

    const handleLogout = () => { setLogin(false); };
    const handleSelect = () => { selectEmployee(null); }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/getEmployees" className="nav-item nav-link active m-1">
                <button className="btn btn-outline-dark">Home</button>
            </Link>
            <Link to="/addEmployee" className="nav-item nav-link active float-right m-1">
                <button className="btn btn-outline-dark" onClick={handleSelect}>Add New Employee</button>
            </Link>
            {
                loggedIn ?
                    <div className="nav-item nav-link active m-1">
                        <Link to="/">
                            <button className="btn btn-outline-dark float-right" onClick={handleLogout}>
                                Logout
                            </button>
                        </Link>
                    </div> :
                    <div className="nav-item nav-link active m-3">
                        <div className="row">
                            <div className="col-4">
                                <Link to="/" className="item nav-link active float-right m-3">
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

interface LinkStateProps {
    loggedIn: boolean
}

const mapStateToProps = (state: AppState): LinkStateProps => {
    return {loggedIn: state.loggedIn};
}

export default connect(mapStateToProps, { selectEmployee, setLogin })(Header);