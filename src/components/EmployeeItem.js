import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { selectEmployee, deleteEmployee } from "../action";

const EmployeeItem = ({ selectEmployee, employee, deleteEmployee }) => {

    const history = useHistory();
    const handleDelete = () => {
        deleteEmployee(employee);
        console.log(employee, "deleted!!");
    }

    const handleView = (event) => {
        event.preventDefault();
        history.push(`/employee/${employee.id}`);
    }
    return (
        <div onClick={() => selectEmployee(employee)}>
            <div>
                <h3>{employee.name}</h3>
            </div>
            <div>
                <button onClick={handleView} className="btn btn-outline-dark m-2">View</button>
                <Link to={`/employee/${employee.id}/edit`}><button className="btn btn-outline-dark m-2">Edit</button></Link>
                <button className="btn btn-outline-dark m-2" onClick={() => handleDelete()}>Delete</button>
            </div>
        </div>
    );
};

export default connect(null, { selectEmployee, deleteEmployee })(EmployeeItem);