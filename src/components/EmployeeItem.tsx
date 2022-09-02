import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectEmployee, deleteEmployee } from "../action/index";
import { selectEmployeeById } from "../api/selectEmployeeByIdAPI";
import { deleteEmployeeAPI } from "../api/deleteEmployeeAPI";

import { AppActions } from "../types/actions";
import { Employee } from "../types/Employee";

const EmployeeItem = ({selectEmployee, employee, deleteEmployee }:
    {
        selectEmployee: (employee: Employee) => AppActions,
        employee: Employee,
        deleteEmployee: (employee: Employee) => AppActions
    }) => {

    const history = useHistory();

    const handleView = (employee: Employee) => {
        selectEmployee(employee);
        history.push(`/getEmployee/${employee.id}`);
    }

    const handleEdit = (employee: Employee) => {
        selectEmployeeById(employee.id)
        .then(response => {
            console.log(response);
            selectEmployee(response.data.object);
            console.log("SELECTED_EMP: ", response.data.object);
            history.push(`/updateEmployee/${employee.id}`);
        })
        .catch( error => {console.log(error)});
    }

    const handleDelete = (employee: Employee) => {  
        deleteEmployeeAPI(employee.id)
            .then( response => {
                console.log("DELETE_EMP_SUCCESS", response);
                deleteEmployee(employee);
                alert("EMPLOYEE DELETED SUCCESSFULLY!");
            } )
            .catch( error  => { console.log(error) });
    }

    return (
        <div data-testid="employee-item">
            <div> <h3> {employee.firstName} {employee.lastName} </h3> </div>
            <div>
                <button
                    onClick={() => handleView(employee)}
                    className="btn btn-outline-dark m-2">
                    View
                </button>

                <button 
                    className="btn btn-outline-dark m-2" 
                    onClick={() => handleEdit(employee)}>
                    Edit
                </button>

                <button
                    className="btn btn-outline-dark m-2"
                    onClick={() => handleDelete(employee)}>
                    Delete
                </button>

            </div>
        </div>
    );
};

export default connect(null, { selectEmployee, deleteEmployee })(EmployeeItem);


// selectEmployeeById(employee.id)
        // .then(response => {
        //     selectEmployee(response.object);
        //     console.log("SELECTED_EMP: ", response.object);
        //     history.push(`/getEmployee/${employee.id}`);
        // })
        // .catch( error => {console.log(error)});