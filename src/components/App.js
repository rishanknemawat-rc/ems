import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import EmployeeList from "./EmployeeList";

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

const employeesList = [
    {
        name: "emp-1",
        id: "101",
        period: "1 year"
    },
    {
        name: "emp-2",
        id: "102",
        period: "1.5 year"
    },
    {
        name: "emp-3",
        id: "103",
        period: "2 year"
    },
];

const App = () => {

    const [employees, setEmployees] = useState(employeesList);
    const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

    const onEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
    };
    
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
                    <EmployeeList employees={employees}/>
                </Route>
            </BrowserRouter>
        </div>
    );
};

export default App;