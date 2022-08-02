import React from "react";
import { connect } from "react-redux";

const EmployeeDetails = ({ selectedEmployee }) => {
    console.log(selectedEmployee);
    if(!selectedEmployee)
        return <div>Please Try Again...</div>
    return (
        <div>
            <label>Employee Name: </label>
            <div>{selectedEmployee.name}</div>
            <br />
            <label>Employee Number: </label>
            <div>{selectedEmployee.id}</div>
            <br />
            <label>Employee Period: </label>
            <div>{selectedEmployee.period}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return { selectedEmployee: state.selectedEmployee };
};

export default connect(mapStateToProps)(EmployeeDetails);