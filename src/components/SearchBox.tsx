import React from "react";
import { Formik, Form, Field } from "formik";

const SearchBox = ({
    setSearchFirstName,
    setSearchLastName,
    setSearchId,
    setSearchDepartment,
    setSort,
    setSortType
}: {
    setSearchFirstName: React.Dispatch<React.SetStateAction<string>>,
    setSearchLastName: React.Dispatch<React.SetStateAction<string>>,
    setSearchId: React.Dispatch<React.SetStateAction<string>>,
    setSearchDepartment: React.Dispatch<React.SetStateAction<string>>,
    setSort: React.Dispatch<React.SetStateAction<string>>,
    setSortType: React.Dispatch<React.SetStateAction<string>>
}) => {
    return (
        <div>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    employeeId: "",
                    department: "",
                    sort: "",
                    sortBy: ""
                }}

                onSubmit={(values: any) => {
                    setSearchFirstName(values.firstName);
                    setSearchLastName(values.lastName);
                    setSearchId(values.employeeId);
                    setSearchDepartment(values.department);
                    setSort(values.sort);
                    setSortType(values.sortBy);
                }}
            >
                <Form>
                    <div className="form-group">
                        <div className="container">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field type="text" className="form-control" name="firstName"/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field type="text" className="form-control" name="lastName"/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="employeeId">Employee ID</label>
                                    <Field type="number" className="form-control" name="employeeId"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="department">Department</label>
                                    <Field as="select" type="text" className="form-control" id="department" name="department">
                                        <option value="">--Select--</option>
                                        <option value="IT">IT</option>
                                        <option value="Finance">Finance</option>
                                        <option value="HR">HR</option>
                                        <option value="Payroll">Payroll</option>
                                        <option value="Sales">Sales</option>
                                        <option value="QA">QA</option>
                                        <option value="Logistics">Logistics</option>
                                        <option value="Administration">Administration</option>
                                    </Field>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="sort">Sort</label>
                                    <Field as="select" id="sort" className="form-control" name="sort">
                                        <option value="">--Select--</option>
                                        <option value="firstName">FirstName</option>
                                        <option value="lastName">LastName</option>
                                        <option value="id">EmployeeId</option>
                                        <option value="department">Department</option>
                                    </Field>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="sortBy">Sort By</label>
                                    <Field as="select" id="sortBy" className="form-control" name="sortBy">
                                        <option value="">--Select--</option>
                                        <option value="asc">Ascending</option>
                                        <option value="dsc">Descending</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="text-center font-weight-bold">
                                <button type="reset" className="btn btn-outline-dark text-center m-2">Reset</button>
                                    <button type="submit" className="btn btn-outline-dark text-center m-2">Search</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
};

export default SearchBox;
