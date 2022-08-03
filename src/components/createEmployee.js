import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { addEmployee } from "../action";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateEmployee = ({ addEmployee, loggedIn }) => {

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: "",
            id: "",
            period: ""
        },
        onSubmit: (value) => {
            addEmployee({
                name: value.name,
                id: value.id,
                period: value.period
            });
            console.log(value);
            history.push("/");
        }
    });

    return (
        <div>
            {loggedIn ?
                <div className="form-group">
                    <form onSubmit={formik.handleSubmit}>
                        <div className=" m-2 text-center font-weight-bold">
                            <label className="form-label">Enter Employee Name:</label>
                            <input className="form-control" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
                        </div>

                        <div className=" m-2 text-center font-weight-bold">
                            <label className="form-label">Enter Employee ID</label>
                            <input className="form-control" type="number" name="id" value={formik.values.id} onChange={formik.handleChange} />
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
                </div> :
                <div className="text-center">
                    <h3 className="text-center font-weight-bold m-4">Please Login to Continue</h3>
                    <Link to="/login"><button className="btn btn-outline-dark text-center m-2">Login</button></Link>
                </div>
            }
        </div>
    );
};

export default connect(null, { addEmployee })(CreateEmployee);