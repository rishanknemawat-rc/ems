import React from "react";
import { connect } from "react-redux";
import { selectEmployee } from "../action";

const EmployeeItem = ({selectEmployee, employee}) => {

    return (
        <div onClick={() => selectEmployee(employee)}>
           <img alt={"emp-img"} src="/"/>
           <div>
                <div>{employee.name}</div>
           </div>
           <div>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
           </div>
        </div>
    );
};

export default connect(null, { selectEmployee })(EmployeeItem);