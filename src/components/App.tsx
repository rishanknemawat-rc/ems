import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import EmployeeList from "./EmployeeList";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeForm from "./EmployeeForm";

const App = () => {
    const [token, setToken] = useState("");
    return (
        <div>
            <BrowserRouter>
                <div data-testid="App">
                    <Header token={token} setToken={setToken} />
                    <Route path="/" exact>
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/signup" exact>
                        <Signup />
                    </Route>
                    <Route path="/getEmployees" exact>
                        <EmployeeList token={token} />
                    </Route>
                    <Route path="/addEmployee">
                        <EmployeeForm token={token} />
                    </Route>
                    <Route path="/getEmployee/:id" exact >
                        <EmployeeDetails token={token} />
                    </Route>
                    <Route path="/updateEmployee/:id" exact>
                        <EmployeeForm token={token} />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;