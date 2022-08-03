import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { addEmployee } from "../action";
import { Link } from "react-router-dom";

const CreateEmployee = (props) => {
    const addEmployee = props.addEmployee;
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
        }
    });

    return (
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
                    <Link to={formik.setSubmitting === false ? "/" : ""}>
                        <button className="btn btn-outline-secondary text-center m-2" type="submit">Submit</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default connect(null, { addEmployee })(CreateEmployee);