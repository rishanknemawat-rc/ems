import React from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
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

const mapStateToProps = (state) => {
    console.log(state);
}
// export default CreateEmployee;
export default connect(mapStateToProps, { addEmployee })(CreateEmployee);











    // const validationSchema = Yup.object().shape({
    //     name: Yup.string()
    //         .required("Employee name is required."),

    //     employee_id: Yup.number()
    //         .required("Enter a valid Employee ID")
    //         .min(3, "Employee ID must be 3 digits long.")
    //         .max(3, "Employee ID must be 3 digits long."),

    //     employee_period: Yup.string()
    //         .required("Employee Period is required.")
    // });

    // return (
    //     <Formik
    //         validationSchema={Yup.object().shape({
    //             name: Yup.string()
    //                 .required("Employee name is required."),

    //             employee_id: Yup.number()
    //                 .required("Enter a valid Employee ID")
    //                 .min(3, "Employee ID must be 3 digits long.")
    //                 .max(3, "Employee ID must be 3 digits long."),

    //             employee_period: Yup.string()
    //                 .required("Employee Period is required.")
    //         })}
    //         initialValues={
    //             {
    //                 name: " ",
    //                 employee_id: 0,
    //                 employee_period: " "
    //             }
    //         }
    //         onSubmit={(values, actions) => {
    //             setTimeout(() => {
    //               alert(JSON.stringify(values, null, 2));
    //               actions.setSubmitting(false);
    //             }, 1000);
    //         }}
    //     >
    //         <Form>
    //             <div>
    //                 <label htmlFor="name">Enter Employee Name:</label>
    //                 <Field type="text" name="name" placeholder="Name"/>
    //             </div>

    //             <div>
    //                 <label htmlFor="employee_id">Enter Employee ID:</label>
    //                 <Field type="number" name="employee_id" placeholder="Employee ID" />
    //             </div>

    //             <div>
    //                 <label htmlFor="employee_period">Enter Employee Period:</label>
    //                 <Field type="text" name="employee_period" placeholder="Employee Period" />
    //             </div>

    //             <button type="submit">Submit</button>
    //         </Form>

    //     </Formik>