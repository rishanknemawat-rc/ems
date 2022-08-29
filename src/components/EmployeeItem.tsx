import React from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { selectEmployee, deleteEmployee } from "../action/index";

import { AppActions } from "../types/actions";
import { Employee } from "../types/Employee";

const EmployeeItem = ({ selectEmployee, employee, deleteEmployee }: 
                        {selectEmployee: (employee: Employee) => AppActions,
                         employee: Employee,
                         deleteEmployee: (employee: Employee) => AppActions}) => {

    const history = useHistory();

    const handleView = (employee: Employee) => {
        selectEmployee(employee);
        history.push(`/employee/${employee.id}`);
    }

    const handleEdit = (employee: Employee) => {
        selectEmployee(employee);
        history.push(`/updateEmployee/${employee.id}`);
    }

    const handleDelete = (employee: Employee) => {
        deleteEmployee(employee);
        alert("EMPLOYEE DELETED SUCCESSFULLY!");
    }

    return (
        <div>
            <div>
                <h3>{employee.firstname} {employee.lastname}</h3>
            </div>
            <div>
                <button
                    onClick={() => handleView(employee)}
                    className="btn btn-outline-dark m-2"
                >
                    View
                </button>
                <Link to={`/employee/${employee.id}/edit`}>
                    <button className="btn btn-outline-dark m-2" onClick={() => handleEdit(employee)}>
                        Edit
                    </button>
                </Link>
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