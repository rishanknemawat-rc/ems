import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import EmployeeList from "./EmployeeList";
import CreateEmployee from "./CreateEmployee";
import EmployeeDetails from "./EmployeeDetails";

const users = [
    {
        email: "user1@xyz",
        password: "pass1"
    },
    {
        email: "user2@xyz",
        password: "pass2"
    },
    {
        email: "user3@xyz",
        password: "pass3"
    },
];

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <Route path="/login" exact>
                    <Login users={users}/>
                </Route>
                <Route path="/signup" exact>
                    <Signup users={users}/>
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