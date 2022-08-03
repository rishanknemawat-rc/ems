import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import EmployeeList from "./EmployeeList";
import CreateEmployee from "./CreateEmployee";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeEdit from "./EmployeeEdit";
import Header from "./Header";

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/" exact component={EmployeeList} />
                    <Route path="/new" exact component={CreateEmployee}/>
                    <Route path="/employee/:id" exact component={EmployeeDetails} />
                    <Route path="/employee/:id/edit" exact component={EmployeeEdit} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;