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
    const [searchFirstName, setSearchFirstName] = useState("");
    const [searchLastName, setSearchLastName] = useState("");
    const [searchId, setSearchId] = useState(0);
    const [searchDepartment, setSearchDepartment] = useState("");
    const [sort, setSort] = useState("");
    const [sortType, setSortType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

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
                        <EmployeeList 
                            token={token} 
                            searchFirstName={searchFirstName}
                            searchLastName={searchLastName}
                            searchId={searchId}
                            searchDepartment={searchDepartment}
                            sort={sort}
                            sortType={sortType}
                            currentPage={currentPage}
                            pageLimit={pageLimit}
                            totalCount={totalCount}
                            setSearchFirstName={setSearchFirstName}
                            setSearchLastName={setSearchLastName}
                            setSearchId={setSearchId}
                            setSearchDepartment={setSearchDepartment}
                            setSort={setSort}
                            setSortType={setSortType}
                            setCurrentPage={setCurrentPage}
                            setPageLimit={setPageLimit}
                            setTotalCount={setTotalCount}
                        />
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