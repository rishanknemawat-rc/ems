import React from "react";
import { connect } from "react-redux";
import EmployeeItem from "./EmployeeItem";


const EmployeeList = ({ employees }) => {
    const renderedList = employees.map(employee => {
        return (
            <div key={employee.id} className="container">
                <div className="row">
                    <div className="col-md-4">
                        <EmployeeItem
                            key={employee.id}
                            employee={employee}
                        />
                    </div>
                </div>
                <br />
            </div>
        );
    });

    return (
        <div>
            {renderedList}
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return {employees: state.addEmployee}
};

export default connect(mapStateToProps)(EmployeeList);