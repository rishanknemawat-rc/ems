import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { editEmployee } from "../action";
import { useHistory } from "react-router-dom";

const EmployeeEdit = ({ employeeList, selectedEmployee, editEmployee }) => {

    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            name: selectedEmployee.name,
            id: selectedEmployee.id,
            period: selectedEmployee.period,
        },
        onSubmit: (value, { setSubmitting }) => {
            const updatedEmployee = {
                name: value.name,
                id: value.id,
                period: value.period
            };
            
            // console.log(employeeList);
            const ind = employeeList.findIndex(emp => {
                // console.log(emp);
                return (emp.id === value.id);
            });

            // console.log(ind);

            if (ind !== -1) {
                editEmployee(updatedEmployee);
                // employeeList[ind] = updatedEmployee;
                console.log(employeeList);
                alert('SUCCESSFULLY EDITED!! :-)\n\n' + JSON.stringify(value, null, 3));
                // setSubmitting(false);
                history.push("/");
            }
            else {
                alert('NOT A VALID EMPLOYEE!! :-)\n\n' + JSON.stringify(value, null, 3));
            }
        }
    });
    return (
        <div>
            <div className="form-group">
                <form onSubmit={formik.handleSubmit}>
                    <div className=" m-2 text-center font-weight-bold">
                        <label className="form-label">Enter Employee Name:</label>
                        <input className="form-control" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
                    </div>

                    <div className=" m-2 text-center font-weight-bold">
                        <label className="form-label">Enter Employee ID</label>
                        <input className="form-control" type="number" name="id" value={formik.values.id} onChange={formik.handleChange} disabled={true}/>
                    </div>

                    <div className=" m-2 text-center font-weight-bold">
                        <label className="form-label">Enter Employee Period</label>
                        <input className="form-control" type="text" name="period" value={formik.values.period} onChange={formik.handleChange} />
                    </div>
                    <div className="text-center font-weight-bold">
                        {/* <Link to={formik.setSubmitting === true ? "/" : ""}> */}
                        <button className="btn btn-outline-secondary text-center m-2" type="submit">Submit</button>
                        {/* </Link> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    // console.log(state);
    return ({ 
        employeeList: state.employees, 
        selectedEmployee: state.selectedEmployee 
    });
};

export default connect(mapStateToProps, { editEmployee })(EmployeeEdit);