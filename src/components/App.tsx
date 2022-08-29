import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import EmployeeList from "./EmployeeList";
import EmployeeDetails from "./EmployeeDetails";
import UpdateEmployee from "./UpdateEmployee";

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/signup" exact>
                        <Signup />
                    </Route>
                    <Route path="/getEmployees" exact>
                        <EmployeeList />
                    </Route>
                    <Route path="/addEmployee">
                        <UpdateEmployee />
                    </Route>
                    <Route path="/employee/:id" exact >
                        <EmployeeDetails />
                    </Route>
                    <Route path="/updateEmployee/:id" exact>
                        <UpdateEmployee />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;