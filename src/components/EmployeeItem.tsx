import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { AppActions } from "../types/actions";
import { Employee } from "../types/Employee";
import { selectEmployee, deleteEmployee } from "../action/index";
import { AppState } from "../reducers/index";
import { selectEmployeeById } from "../api/selectEmployeeByIdAPI";
import { deleteEmployeeAPI } from "../api/deleteEmployeeAPI";

const EmployeeItem = ({ serialNumber, token, selectEmployee, employee, deleteEmployee }:
    {
        serialNumber: number,
        token: string,
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
        selectEmployeeById(employee.id, token)
            .then(response => {
                selectEmployee(response.data.object);
                console.log("SELECTED_EMP: ", response.data.object);
                history.push(`/updateEmployee/${employee.id}`);
            })
            .catch(error => { console.log(error) });
    }

    const handleDelete = (employee: Employee) => {
        deleteEmployeeAPI(employee.id, token)
            .then(response => {
                console.log("DELETE_EMP_SUCCESS", response);
                deleteEmployee(employee);
                alert("EMPLOYEE DELETED SUCCESSFULLY!");
            })
            .catch(error => { console.log(error) });
    }

    return (
            <tr key={employee.id}>
                <th scope="row">{serialNumber}</th>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.id}</td>
                <td>{employee.department}</td>
                <td>{employee.manager}</td>
                <td>                    
                    <button
                        onClick={() => handleView(employee)}
                        className="btn btn-outline-dark ">
                        View
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-outline-dark"
                        onClick={() => handleEdit(employee)}>
                        Edit
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-outline-dark"
                        onClick={() => handleDelete(employee)}>
                        Delete
                    </button>
                </td>
            </tr>
    );
};

const mapStateToProps = (state: AppState, ownProps: any) => { return { token: ownProps.token } }

export default connect(mapStateToProps, { selectEmployee, deleteEmployee })(EmployeeItem);