import React from "react";
import EmployeeItem from "./EmployeeItem";

const EmployeeList = ({ employees }) => {
    const renderedList = employees.map(employee => {
        return (
            <div className="container">
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

export default EmployeeList;