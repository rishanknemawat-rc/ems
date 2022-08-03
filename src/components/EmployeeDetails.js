import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const EmployeeDetails = ({ selectedEmployee }) => {
    // console.log(selectedEmployee);
    if(!selectedEmployee)
        return <div>Please Try Again...</div>
    return (
        <div className="row">
            <div className="col-4"></div>
            <div className="border border-secondary text-center m-5 p-4 col-4">
                <p className="font-weight-bold">Employee Name: {selectedEmployee.name}</p>
                
                <p className="font-weight-bold">Employee Number: {selectedEmployee.id}</p>
                
                <p className="font-weight-bold">Employee Period: {selectedEmployee.period}</p>
                <Link to="/"><button className="btn btn-outline-dark m-2"> Home</button></Link>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return { selectedEmployee: state.selectedEmployee };
};

export default connect(mapStateToProps)(EmployeeDetails);