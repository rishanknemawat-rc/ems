import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { selectEmployee, deleteEmployee } from "../action/index";
import { Employee } from "../types/Employee";
import { AppActions } from "../types/actions";
import { AppState } from "../reducers/index";
import { selectEmployeeById } from "../api/selectEmployeeByIdAPI";
import { deleteEmployeeAPI } from "../api/deleteEmployeeAPI";

const EmployeeTable = ({ employees, token, selectEmployee, deleteEmployee }:
    {
        employees: Employee[],
        token: string,
        selectEmployee: (employee: Employee | null) => AppActions,
        deleteEmployee: (employee: Employee) => AppActions
    }
) => {

    const [sorting, setSorting] = useState({ key: "indexNumber", ascending: true });
    const [currentEmployees, setCurrentEmployees] = useState([...employees]);

    const history = useHistory();

    const handleView = (employee: Employee) => {
        selectEmployee(employee);
        // console.log(employee);
        history.push(`/getEmployee/${employee.id}`);
    }

    const handleEdit = (employee: Employee) => {
        selectEmployeeById(employee.id, token)
            .then(response => {
                // console.log(response);
                selectEmployee(response.data.data);
                // console.log("SELECTED_EMP: ", response.data.object);
                history.push(`/updateEmployee/${employee.id}`);
            })
            .catch(error => { console.log(error) });
    }

    const handleDelete = (employee: Employee) => {
        deleteEmployeeAPI(employee.id, token)
            .then(response => {
                // console.log("DELETE_EMP_SUCCESS", response);
                deleteEmployee(employee);
                alert("EMPLOYEE DELETED SUCCESSFULLY!");
            })
            .catch(error => { console.log(error) });
    }


    useEffect(() => {
        setCurrentEmployees([...employees]);
    }, [employees]);

    useEffect(() => {
        // console.log("current Employees", currentEmployees);
        const currentEmployeesCopy = [...currentEmployees];

        const sortedCurrentUsers = currentEmployeesCopy.sort((a, b) => {
            if (sorting.key === "firstName" ||
                sorting.key === "lastName" ||
                sorting.key === "department" ||
                sorting.key === "manager")
                return a[sorting.key].localeCompare(b[sorting.key]);
            else if (sorting.key === "id")
                return a < b ? 1 : -1;
            else
                return 0;
        });
        setCurrentEmployees(
            sorting.ascending ? sortedCurrentUsers : sortedCurrentUsers.reverse()
        );
    }, [sorting.key, sorting.ascending]);

    function applySorting(key: string) {
        if (sorting.key === key)
            setSorting({ key: sorting.key, ascending: !sorting.ascending });
        else
            setSorting({ key: key, ascending: true });
    }

    return (
        <div>
            <table className="table text-center table-striped table-bordered table-hover m-2">
                <thead>
                    <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col" onClick={() => applySorting("firstName")}>First Name</th>
                        <th scope="col" onClick={() => applySorting("lastName")}>Last Name</th>
                        <th scope="col" onClick={() => applySorting("id")}>Employee ID</th>
                        <th scope="col" onClick={() => applySorting("department")}>Manager</th>
                        <th scope="col" onClick={() => applySorting("manager")}>Department</th>
                        <th scope="col" >View</th>
                        <th scope="col" >Edit</th>
                        <th scope="col" >Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map((employee, index) => (
                        <tr key={employee.id}>
                            <td className="text-text text-sm p-2">{index + 1}</td>
                            <td className="text-text text-sm p-2">{employee.firstName}</td>
                            <td className="text-text text-sm p-2">{employee.lastName}</td>
                            <td className="text-text text-sm p-2">{employee.id}</td>
                            <td className="text-text text-sm p-2">{employee.manager}</td>
                            <td className="text-text text-sm p-2">{employee.department}</td>
                            <td className="text-text text-sm p-2">
                                <button
                                    onClick={() => handleView(employee)}
                                    className="btn btn-outline-dark ">
                                    View
                                </button>
                            </td>
                            <td className="text-text text-sm p-2">
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => handleEdit(employee)}>
                                    Edit
                                </button>
                            </td>
                            <td className="text-text text-sm p-2">
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => handleDelete(employee)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state: AppState, ownProps: any) => {
    return {
        token: ownProps.token,
        employees: ownProps.employees
    }
}

export default connect(mapStateToProps, { selectEmployee, deleteEmployee })(EmployeeTable);