import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import { Employee } from "../types/Employee";
import { selectEmployee, setLogin } from "../action/index";
import { AppState } from "../reducers/index";
import api from "../api/baseAPI";
import { stringify } from "querystring";

const Header = ({ manager, token, setToken, loggedIn, setLogin, selectEmployee }:
    {
        manager: string,
        token: string,
        setToken: React.Dispatch<React.SetStateAction<string>>,
        loggedIn: boolean,
        setLogin: (login: boolean) => void,
        selectEmployee: (employee: Employee | null) => AppState
    }) => {

    const handleLogout = async () => {

        await api.post("/logout", {
            headers: { "Authorization": token }
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
    if(!loggedIn)
        return null;
    else 
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" data-testid="nav-bar">
            <Link to="/getEmployees" className="nav-item nav-link active m-1">
                <button className="btn btn-outline-dark">Home</button>
            </Link>
            <Link to="/addEmployee" className="nav-item nav-link active float-right m-1">
                <button className="btn btn-outline-dark" onClick={handleSelect}>Add New Employee</button>
            </Link>
            <div className="nav-item nav-link active m-1">
                <Link to="/">
                    <button className="btn btn-outline-dark float-right" onClick={handleLogout}>
                        Logout
                    </button>
                </Link>
            </div>
        </nav>
    );
};

interface LinkStateProps {
    manager: string,
    loggedIn: boolean,
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>
}

const mapStateToProps = (state: AppState, ownProps: any): LinkStateProps => {
    return {
        manager: state.manager,
        loggedIn: state.loggedIn,
        token: ownProps.token,
        setToken: ownProps.setToken
    };
}

export default connect(mapStateToProps, { selectEmployee, setLogin })(Header);