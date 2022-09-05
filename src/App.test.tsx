import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import '@testing-library/jest-dom'

import { reducers } from './reducers/index';
import App from './components/App';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from "./components/App";
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeItem from './components/EmployeeItem';
import EmployeeList from './components/EmployeeList';
import { Employee } from './types/Employee';

const employee: Employee = {firstName: "rishank", lastName: "nemawat", id: 101, manager: "abc", department: "abcd"};

function renderWithRedux(component: any, { initialState, store = createStore(reducers, initialState) } = {} ){
    return {
        ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>)
    }
}

// Renders <App />
test('Renders App page', () => {
    renderWithRedux(<App />);
    const app = screen.getByTestId('App');
    expect(app).toBeInTheDocument();
});


// TESTS FOR SIGNUP PAGE
test('Renders Signup Form', () => {
    renderWithRedux(<Signup />);
    const signup = screen.getByTestId('signup-form');
    expect(signup).toBeInTheDocument();
});

test('Signup Form - Username field', () => {
    renderWithRedux(<Signup />);
    const signup = screen.getByTestId("signup-username");
    expect(signup).toBeInTheDocument();
});

test('Signup Form - Password field', () => {
    renderWithRedux(<Signup />);
    const signup = screen.getByTestId("signup-password");
    expect(signup).toBeInTheDocument();
});

test('Signup Form - Submit Button', () => {
    renderWithRedux(<Signup />);
    const signup = screen.getByTestId("signup-submit-button");
    expect(signup).toBeInTheDocument();
});

test('Signup Form - Login Button Option', () => {
    renderWithRedux(<Signup />);
    const signup = screen.getByTestId("login-option");
    expect(signup).toBeInTheDocument();
});

// TESTS FOR LOGIN PAGE
test('Renders login Form', () => {
    renderWithRedux(<Login />);
    const login = screen.getByTestId('login-form');
    expect(login).toBeInTheDocument();
});
test('login Form - username field', () => {
    renderWithRedux(<Login />);
    const login = screen.getByTestId('login-username');
    expect(login).toBeInTheDocument();
});
test('login Form - password field', () => {
    renderWithRedux(<Login />);
    const login = screen.getByTestId('login-password');
    expect(login).toBeInTheDocument();
});
test('login Form - Login Submit Button', () => {
    renderWithRedux(<Login />);
    const login = screen.getByTestId('login-submit-button');
    expect(login).toBeInTheDocument();
});
test('Login Form - Signup Button Option', () => {
    renderWithRedux(<Login />);
    const login = screen.getByTestId('signup-button-option');
    expect(login).toBeInTheDocument();
});

// TESTS FOR NAVIGATION BAR - <Header />
test('Renders Navigation Bar', () => {
    renderWithRedux(<Header />);
    const navbar = screen.getByTestId('nav-bar');
    expect(navbar).toBeInTheDocument();
});

test('Navigation Bar - Home button', () => {
    renderWithRedux(<Header />);
    const Home = screen.getByRole("button", {name: "Home"});
    expect(Home).toBeInTheDocument();
});

test('Navigation Bar - Add Employee button', () => {
    renderWithRedux(<Header />);
    const addEmployee = screen.getByRole("button", {name: "Add New Employee"});
    expect(addEmployee).toBeInTheDocument();
});

test('Navigation Bar - Login button when logout', () => {
    renderWithRedux(<Header />, {initialState: {loggedIn: false}});
    const login = screen.getByRole("button", {name: "Login"});
    expect(login).toBeInTheDocument();
});

test('Navigation Bar - Signup button when logout', () => {
    renderWithRedux(<Header />, {initialState: {loggedIn: false}});
    const signup = screen.getByRole("button", {name: "Signup"});
    expect(signup).toBeInTheDocument();
});

test('Navigation Bar - Logout button when loggedin', () => {
    renderWithRedux(<Header />, {initialState: {loggedIn: true}});
    const logout = screen.getByRole("button", {name: "Logout"});
    expect(logout).toBeInTheDocument();
});

test('Navigation Bar - No Logout button when logged-out', () => {
    renderWithRedux(<Header />, {initialState: {loggedIn: false}});
    const logout = screen.queryByRole("button", {name: "Logout"});
    expect(logout).not.toBeInTheDocument();
});

test('Navigation Bar - No Login button when loggedin', () => {
    renderWithRedux(<Header />, {initialState: {loggedIn: true}});
    const login = screen.queryByRole("button", {name: "Login"});
    expect(login).not.toBeInTheDocument();
});

test('Navigation Bar - No Signup button when loggedin', () => {
    renderWithRedux(<Header />, {initialState: {loggedIn: true}});
    const signup = screen.queryByRole("button", {name: "Signup"});
    expect(signup).not.toBeInTheDocument();
});

// TESTS FOR EMPLOYEE FORM
test('Renders Employee Form when logged-in', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true}});
    const empForm = screen.getByTestId('emp-form-login-true');
    expect(empForm).toBeInTheDocument();
});

test('Renders Employee Form (LoggedIn) - EDIT FORM HEADING', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true, selectedEmployee: employee}});
    const editFormHeading = screen.getByText('EDIT EMPLOYEE FORM');
    expect(editFormHeading).toBeInTheDocument();
});

test('Renders Employee Form (LoggedIn) - ADD EMPLOYEE FORM HEADING', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true, selectedEmployee: null}});
    const addFormHeading = screen.getByText('ADD EMPLOYEE FORM');
    expect(addFormHeading).toBeInTheDocument();
});

test('Renders Employee Form (LoggedIn) - First Name Field', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true}});
    const firstName = screen.getByTestId('firstName');
    expect(firstName).toBeInTheDocument();
});

test('Renders Employee Form (LoggedIn) - last Name Field', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true}});
    const lastName = screen.getByTestId('lastName');
    expect(lastName).toBeInTheDocument();
});

test('Renders Employee Form (LoggedIn) - Employee ID Field', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true}});
    const employeeID = screen.getByTestId('employeeId');
    expect(employeeID).toBeInTheDocument();
});

test('Renders Employee Form (LoggedIn) - Manager Field', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true}});
    const manager = screen.getByTestId('manager');
    expect(manager).toBeInTheDocument();
});

test('Renders Employee Form (LoggedIn) - Department Field', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true}});
    const department = screen.getByTestId('department');
    expect(department).toBeInTheDocument();
});

test('Renders Employee Form (LoggedIn) - Submit button', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true}});
    const submit = screen.getByRole("button",{name: "Submit"});
    expect(submit).toBeInTheDocument();
});

test('Renders Employee Form when logged out', () => {
    renderWithRedux(<EmployeeForm />);
    const empForm = screen.getByTestId('employee-form-loggedout');
    expect(empForm).toBeInTheDocument();
});


// TESTS FOR EMPLOYEE DETAILS - <EmployeeDetails />
test('Renders Employee Details when logged in and employee is selected', () => {
    renderWithRedux(<EmployeeDetails />, {initialState: {loggedIn: true, selectedEmployee: {employee}}});
    const empDetails = screen.getByTestId('employee-details-logged-in');
    expect(empDetails).toBeInTheDocument();
});

test('Renders Employee Details when logged in and employee is not selected', () => {
    renderWithRedux(<EmployeeDetails />, {initialState: {loggedIn: true, selectedEmployee: null}});
    const empDetails = screen.getByText('Please Try Again.');
    expect(empDetails).toBeInTheDocument();
});

test('Renders Employee Details when logged out', () => {
    renderWithRedux(<EmployeeDetails />);
    const empDetails = screen.getByTestId('employee-details');
    expect(empDetails).toBeInTheDocument();
});

// <EmployeeList />
test('Renders Employees list when loggedIn', () => {
    renderWithRedux(<EmployeeList />, {initialState: {loggedIn: true}});
    const employeesList = screen.getByTestId('employees-list');
    expect(employeesList).toBeInTheDocument();
});

test('Employees list - Search Box', () => {
    renderWithRedux(<EmployeeList />, {initialState: {loggedIn: true}});
    const searchBox = screen.getByTestId('search-box');
    expect(searchBox).toBeInTheDocument();
});

test('Employees list - Sort Box', () => {
    renderWithRedux(<EmployeeList />, {initialState: {loggedIn: true}});
    const sortBox = screen.getByTestId('sort-box');
    expect(sortBox).toBeInTheDocument();
});

test('Renders Employees List -  login form when logged-out', () => {
    renderWithRedux(<EmployeeList />);
    const login = screen.getByTestId('employees-list-logout');
    expect(login).toBeInTheDocument();
});

// <EmployeeItem />
test('Renders Employee Item', () => {
    renderWithRedux(<EmployeeItem employee={employee}/>);
    const empForm = screen.getByTestId('employee-item');
    expect(empForm).toBeInTheDocument();
});

test('Employee Item - Full Name', () => {
    renderWithRedux(<EmployeeItem employee={employee}/>);
    const fullName = screen.getByTestId('fullName');
    expect(fullName).toBeInTheDocument();
});

test('Employee Item - View button', () => {
    renderWithRedux(<EmployeeItem employee={employee}/>);
    const viewButton = screen.getByRole("button", {name: "View"});
    expect(viewButton).toBeInTheDocument();
});

test('Employee Item - Edit button', () => {
    renderWithRedux(<EmployeeItem employee={employee}/>);
    const editButton = screen.getByRole("button", {name: "Edit"});
    expect(editButton).toBeInTheDocument();
});

test('Employee Item - Delete button', () => {
    renderWithRedux(<EmployeeItem employee={employee}/>);
    const deleteButton = screen.getByRole("button", {name: "Delete"});
    expect(deleteButton).toBeInTheDocument();
});













// test('renders app page', () => {
//   render(<Provider store={store}>{<App />}</Provider>);
//   const login = screen.getByTestId('login');
//   expect(login).toBeInTheDocument();
// });