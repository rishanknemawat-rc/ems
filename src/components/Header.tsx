import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import { selectEmployee, setLogin } from "../action/index";
import { Employee } from "../types/Employee";
import { AppState } from "../reducers/index";
import api from "../api/baseAPI";

const Header = ({ token, setToken, loggedIn, setLogin, selectEmployee} : 
    { 
        token: string,
        setToken: React.Dispatch<React.SetStateAction<string>>,
        loggedIn: boolean, 
        setLogin: (login: boolean) => void, 
        selectEmployee: (employee: Employee| null) => AppState
    })  => {

    const handleLogout = async () => { 
        
        await api.post("/logout", {
            headers: {"Authorization": token}
        })
        .then((response: any) => {
            setLogin(false);
            setToken("");
            console.log("LOGOUT_SUCCESS", response);
        })
        .catch((error: any) => {
            console.log("LOGOUT_ERROR", error);
        });
    };

    const handleSelect = () => { selectEmployee(null); }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" data-testid="nav-bar">
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
    loggedIn: boolean,
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>
}

const mapStateToProps = (state: AppState, ownProps: any): LinkStateProps => {
    return {
        loggedIn: state.loggedIn,
        token: ownProps.token,
        setToken: ownProps.setToken
    };
}

export default connect(mapStateToProps, { selectEmployee, setLogin })(Header);