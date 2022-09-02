import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import { store } from "./index";
import App from './components/App';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from "./components/App";
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeItem from './components/EmployeeItem';
import EmployeeList from './components/EmployeeList';


// data-testid=""

function renderWithRedux(component: any){
    return {
        ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>)
    }
}

test('Renders App page', () => {
    renderWithRedux(<App />);
    const app = screen.getByTestId('App');
    expect(app).toBeInTheDocument();
});

test('Renders Signup Form', () => {
    renderWithRedux(<Signup />);
    const signup = screen.getByTestId('signup-form');
    expect(signup).toBeInTheDocument();
});

test('Renders login Form', () => {
    renderWithRedux(<Login />);
    const login = screen.getByTestId('login-form');
    expect(login).toBeInTheDocument();
});

test('Renders Navigation Bar', () => {
    renderWithRedux(<Header />);
    const navbar = screen.getByTestId('nav-bar');
    expect(navbar).toBeInTheDocument();
});

test('Renders Employee Form when logout', () => {
    renderWithRedux(<EmployeeForm />);
    const empForm = screen.getByTestId('employee-form-loggedout');
    expect(empForm).toBeInTheDocument();
});

test('Renders Employee Details when logged out', () => {
    renderWithRedux(<EmployeeDetails />);
    const empDetails = screen.getByTestId('employee-details');
    expect(empDetails).toBeInTheDocument();
});

test('Renders Employees List', () => {
    renderWithRedux(<EmployeeList />);
    const empList = screen.getByTestId('employees-list');
    expect(empList).toBeInTheDocument();
});

// test('Renders Employee Item', () => {
//     renderWithRedux(<EmployeeItem />);
//     const empForm = screen.getByTestId('employee-item');
//     expect(empForm).toBeInTheDocument();
// });













// test('renders app page', () => {
//   render(<Provider store={store}>{<App />}</Provider>);
//   const login = screen.getByTestId('login');
//   expect(login).toBeInTheDocument();
// });