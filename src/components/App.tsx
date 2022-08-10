import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
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

    const handleLogin = (event: boolean) => {
        setLoggedIn(event);
    };

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header 
                        loggedIn={loggedIn} 
                        handleLogin={handleLogin}
                    />
                    <Route path="/login" exact>
                        <Login 
                            handleLogin={handleLogin}
                        />
                    </Route>
                    <Route path="/signup" exact>
                        <Signup 
                            handleLogin={handleLogin}
                        />
                    </Route>
                    <Route path="/" exact>
                        <EmployeeList 
                            loggedIn={loggedIn}
                        />
                    </Route>
                    <Route path="/new">
                        <CreateEmployee 
                            loggedIn={loggedIn}
                        />
                    </Route>
                    <Route path="/employee/:id" exact >
                        <EmployeeDetails 
                            loggedIn={loggedIn}
                        />
                    </Route>
                    <Route path="/employee/:id/edit" exact>
                        <EmployeeEdit 
                            loggedIn={loggedIn}
                        />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;