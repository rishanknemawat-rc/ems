import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmployee } from "../action";

const EmployeeItem = ({ selectEmployee, employee }) => {

    return (
        <div onClick={() => selectEmployee(employee)}>
            <div>
                <h3>{employee.name}</h3>
            </div>
            <div>
                <Link to="/emp" ><button className="btn btn-outline-dark m-2">View</button></Link>
                <Link><button className="btn btn-outline-dark m-2">Edit</button></Link>
                <Link><button className="btn btn-outline-dark m-2">Delete</button></Link>
            </div>
        </div>
    );
};

export default connect(null, { selectEmployee })(EmployeeItem);