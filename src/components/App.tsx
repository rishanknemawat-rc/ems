import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import Header from "./Header";
import NewSignup from "./newSignup";
import EmployeeList from "./EmployeeList";
import EmployeeDetails from "./EmployeeDetails";
import UpdateEmployee from "./UpdateEmployee";
import NewLogin from "./newLogin";

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact>
                        <NewLogin />
                    </Route>
                    <Route path="/signup" exact>
                        <NewSignup />
                    </Route>
                    <Route path="/getEmployees" exact>
                        <EmployeeList />
                    </Route>
                    <Route path="/addEmployee">
                        <UpdateEmployee />
                    </Route>
                    <Route path="/getEmployee/:id" exact >
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