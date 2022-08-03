import React from "react";
import { connect } from "react-redux";
import EmployeeItem from "./EmployeeItem";


const EmployeeList = ({ employees }) => {
    const renderedList = employees.map(employee => {
        return (
            <div key={employee.id}>
                <div key={employee.id} className="list-group m-4">
                    <div key={employee.id} className="list-group-item text-center">
                        <div>
                            <EmployeeItem
                                key={employee.id}
                                employee={employee}
                            />
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        );
    });

    return (
        <div>
            <h1 className="text-center font-weight-bold m-4">EMPLOYEE LIST</h1>
            {renderedList}
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return { employees: state.employees}
};

export default connect(mapStateToProps)(EmployeeList);