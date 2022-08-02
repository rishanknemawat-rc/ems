import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmployee } from "../action";

const EmployeeItem = ({ selectEmployee, employee }) => {

    return (
        <div onClick={() => selectEmployee(employee)}>
            <img alt={"emp-img"} src="/" />
            <div>
                <div>{employee.name}</div>
            </div>
            <div>
                <Link to="/emp"><button>View</button></Link>
                <Link><button>Edit</button></Link>
                <Link><button>Delete</button></Link>
            </div>
        </div>
    );
};

export default connect(null, { selectEmployee })(EmployeeItem);