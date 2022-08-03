import React, { useState } from "react";
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

    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (event) => {
        setLoggedIn(event);
    };

    return (
        <div>
            <BrowserRouter>
                <div>
                    {loggedIn ? <Header loggedIn={loggedIn} handleLogin={handleLogin}/> : ""}
                    <Route path="/login" exact>
                        <Login loggedIn={loggedIn} handleLogin={handleLogin}/>
                    </Route>
                    <Route path="/signup" exact>
                        <Signup loggedIn={loggedIn} handleLogin={handleLogin}/>
                    </Route>
                    <Route path="/" exact>
                        <EmployeeList loggedIn={loggedIn} handleLogin={handleLogin}/>
                    </Route>
                    <Route path="/new">
                        <CreateEmployee loggedIn={loggedIn} handleLogin={handleLogin}/>
                    </Route>
                    <Route path="/employee/:id" exact >
                        <EmployeeDetails loggedIn={loggedIn} handleLogin={handleLogin}/>
                    </Route>
                    <Route path="/employee/:id/edit" exact>
                        <EmployeeEdit loggedIn={loggedIn} handleLogin={handleLogin}/>
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;