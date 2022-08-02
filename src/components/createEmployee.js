import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { addEmployee } from "../action";

const CreateEmployee = ({addEmployee}) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            id: "",
            period: ""
        },
        onSubmit: value => {
            addEmployee({
                name: value.name,
                id: value.id,
                period: value.period
            });
        }
    });

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Enter Employee Name:</label>
                    <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange}/>
                </div>

                <div>
                    <label>Enter Employee ID</label>
                    <input type="number" name="id" value={formik.values.id} onChange={formik.handleChange}/>
                </div>

                <div>
                    <label>Enter Employee Period</label>
                    <input type="text" name="period" value={formik.values.period} onChange={formik.handleChange}/>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default connect(null, { addEmployee })(CreateEmployee);