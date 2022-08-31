import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectEmployee, deleteEmployee } from "../action/index";
import api from "../api/api";

import { AppActions } from "../types/actions";
import { Employee } from "../types/Employee";

const EmployeeItem = ({ selectEmployee, employee, deleteEmployee }:
    {
        selectEmployee: (employee: Employee) => AppActions,
        employee: Employee,
        deleteEmployee: (employee: Employee) => AppActions
    }) => {

    const history = useHistory();

    const selectEmployeeById = async (employee: Employee) => {
        return await api.get(`/getEmployee/${employee.id}`, {
            headers: {
                "Authorization" : "Basic cmlzaDpyaXNo"
            }
        })
        .then( response => {
            selectEmployee(response.data.object);
        })
        .catch(error => {
            console.log(error);
        });
    }
    const handleView = (employee: Employee) => {

        selectEmployeeById(employee)
        .then(
            history.push(`/getEmployee/${employee.id}`)
        );
    }

    const handleEdit = (employee: Employee) => {
        selectEmployeeById(employee)
        .then(
            history.push(`/updateEmployee/${employee.id}`)
        );
    }

    const handleDelete = (employee: Employee) => {
        deleteEmployee(employee);
    }

    return (
        <div>
            <div>
                <h3>{employee.firstName} {employee.lastName}</h3>
            </div>
            <div>
                <button
                    onClick={() => handleView(employee)}
                    className="btn btn-outline-dark m-2"
                >
                    View
                </button>
                <button 
                    className="btn btn-outline-dark m-2" 
                    onClick={() => handleEdit(employee)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-outline-dark m-2"
                    onClick={() => handleDelete(employee)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default connect(null, { selectEmployee, deleteEmployee })(EmployeeItem);