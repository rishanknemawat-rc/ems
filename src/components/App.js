import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import EmployeeList from "./EmployeeList";
import CreateEmployee from "./CreateEmployee";
import EmployeeDetails from "./EmployeeDetails";

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/signup" exact>
                    <Signup/>
                </Route>
                <Route path="/" exact>
                    <EmployeeList />
                </Route>
                <Route path="/new" exact>
                    <CreateEmployee />
                </Route>
                <Route path="/emp" exact>
                    <EmployeeDetails />
                </Route>
            </BrowserRouter>
        </div>
    );
};

export default App;