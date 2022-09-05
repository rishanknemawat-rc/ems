import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
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


function renderWithRedux(component: any, { initialState, store = createStore(reducers, initialState) } = {} ){
    return {
        ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>)
    }
}

// <App />
test('Renders App page', () => {
    renderWithRedux(<App />);
    const app = screen.getByTestId('App');
    expect(app).toBeInTheDocument();
});


// <Signup />
test('Renders Signup Form', () => {
    renderWithRedux(<Signup />);
    const signup = screen.getByTestId('signup-form');
    expect(signup).toBeInTheDocument();
});

// <Login />
test('Renders login Form', () => {
    renderWithRedux(<Login />);
    const login = screen.getByTestId('login-form');
    expect(login).toBeInTheDocument();
});

// <Header />
test('Renders Navigation Bar', () => {
    renderWithRedux(<Header />);
    const navbar = screen.getByTestId('nav-bar');
    expect(navbar).toBeInTheDocument();
});

const employee: Employee = {firstName: "rishank", lastName: "nemawat", id: 101, manager: "abc", department: "abcd"};

// <EmployeeForm />
test('Renders Employee Form when logged-in', () => {
    renderWithRedux(<EmployeeForm />, {initialState: {loggedIn: true}});
    const empForm = screen.getByTestId('emp-form-login-true');
    expect(empForm).toBeInTheDocument();
});

test('Renders Employee Form when logged out', () => {
    renderWithRedux(<EmployeeForm />);
    const empForm = screen.getByTestId('employee-form-loggedout');
    expect(empForm).toBeInTheDocument();
});

// <EmployeeDetails />
test('Renders Employee Details when logged in and employee is selected', () => {
    renderWithRedux(<EmployeeDetails />, {initialState: {loggedIn: true, selectedEmployee: {employee}}});
    const empDetails = screen.getByTestId('employee-details-logged-in');
    expect(empDetails).toBeInTheDocument();
});

test('Renders Employee Details when logged out', () => {
    renderWithRedux(<EmployeeDetails />);
    const empDetails = screen.getByTestId('employee-details');
    expect(empDetails).toBeInTheDocument();
});

// <EmployeeList />
test('Renders Employees List', () => {
    renderWithRedux(<EmployeeList />);
    const empList = screen.getByTestId('employees-list');
    expect(empList).toBeInTheDocument();
});

// <EmployeeItem />
test('Renders Employee Item', () => {
    renderWithRedux(<EmployeeItem employee={employee}/>);
    const empForm = screen.getByTestId('employee-item');
    expect(empForm).toBeInTheDocument();
});













// test('renders app page', () => {
//   render(<Provider store={store}>{<App />}</Provider>);
//   const login = screen.getByTestId('login');
//   expect(login).toBeInTheDocument();
// });