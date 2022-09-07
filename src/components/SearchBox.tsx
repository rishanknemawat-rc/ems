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
                    employeeId: 0,
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
                                    <Field type="text" className="form-control" id="department" name="department"/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="sort">Sort</label>
                                    <Field as="select" id="sort" className="form-control" defaultValue="none" name="sort">
                                        <option value="none">Select</option>
                                        <option value="firstName">FirstName</option>
                                        <option value="lastName">LastName</option>
                                        <option value="employeeId">EmployeeId</option>
                                        <option value="department">Department</option>
                                    </Field>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="sortBy">Sort By</label>
                                    <Field as="select" id="sortBy" className="form-control" defaultValue="none" name="sortBy">
                                        <option value="none">Select</option>
                                        <option value="ascending">Ascending</option>
                                        <option value="descending">Descending</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="text-center font-weight-bold">
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
