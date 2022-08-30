// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { connect } from "react-redux";
// import { useFormik } from "formik";

// import { AppState } from "../reducers/index";
// import { addUser } from "../action/index";
// import { setManager } from "../action/index";

// import { User } from "../types/User";
// import { Error } from "../types/Error";
// import { AppActions } from "../types/actions";


// const Signup = ({ users, addUser, setManager }: 
//                 { 
//                     users: User[], 
//                     addUser: (user: User) => AppActions, 
//                     setManager: (manager: string) => AppActions
//                 }) => {

//     interface ErrorMessage {
//         name?: string,
//         message?: string
//     }

//     const [errorMessage, setErrorMessage] = useState<ErrorMessage>({name: "", message: ""});
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [userCreated, setUserCreated] = useState(false);

//     const history = useHistory();
//     const renderForm = () => {

//         const handleSubmit = (event: { preventDefault: () => void; }) => {
//             event.preventDefault();

//             const username_chars = /^[a-zA-Z]+$/;
//             const password_chars = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,16}$/;
//             const user = users.find(user => user.username === username);
            
//             if (!username)
//                 setErrorMessage({ 
//                     name: "username", 
//                     message: "Username cannot be empty." 
//                 });

//             else if (!password)
//                 setErrorMessage({ 
//                     name: "password", 
//                     message: "Password cannot be empty." 
//                 });

//             else if(!username.match(username_chars)){
//                 setErrorMessage({
//                     name: "username",
//                     message: "Username should contains letters only."
//                 })
//             }
//             else if (user)
//                 setErrorMessage({ 
//                     name: "username", 
//                     message: "User Already exists." 
//                 });
//             else if (!password.match(password_chars))
//                 setErrorMessage({
//                     name: "password",
//                     message: "Password must be between 8 to 15 characters." + 
//                                 "Must contain special character, " +
//                                 "a number, a lowercase character," + 
//                                 " and an uppercase character."
//                 });
//             else {
//                 setUserCreated(true);
//                 const newUser: User = {
//                     username: username,
//                     password: password
//                 };
//                 addUser(newUser);
//                 // setLogin(true);
//                 setManager(username);
//                 alert('USER CREATED SUCCESSFULLY!');
//                 history.push("/");
//             };
//         }

//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-3"></div>
//                     <form className="form-group col-6" onSubmit = {handleSubmit}>
//                         <div className="col px-md-5">
//                             <label className="form-label">
//                                 Enter Username
//                             </label>
//                             <input 
//                                 className="form-control"
//                                 name="username"
//                                 type="text"
//                                 onChange={e => setUsername(e.target.value)}
//                                 required
//                             />
//                             <p className="text-danger">
//                                 {errorMessage.name === "username" ? 
//                                 errorMessage.message : 
//                                 ""}
//                             </p>
//                         </div>

//                         <br/>
                        
//                         <div className="col px-md-5">
//                             <label className="form-label">
//                                 Enter Password
//                             </label>
//                             <input 
//                                 className="form-control"
//                                 name="password"
//                                 type="password"
//                                 onChange={e => setPassword(e.target.value)}
//                                 required
//                             />
//                             <p className="text-danger">
//                                 {errorMessage.name === "password" ?
//                                 errorMessage.message : 
//                                 ""}
//                             </p>
//                         </div>
                        
//                         <br />
                        
//                         <div className="col px-md-5 text-center">
//                             <button 
//                                 className="btn btn-outline-secondary" 
//                                 type="submit"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>

//                 <div className="text-center font-weight-bold">
//                     Already a user?
//                     <Link to="/">
//                         <button className="btn btn-outline-secondary m-3">
//                             Login 
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//         );
//     };



//     return (
//         <div>
//             <h1 className="text-center font-weight-bold m-3">
//                 Signup Page
//             </h1>
//             {!userCreated ?
//                 renderForm() :
//                 <div 
//                     className="alert alert-success text-center" 
//                     role="alert"
//                 >
//                     User created successfully.
//                 </div>
//             }
//         </div>
//     );
// };

// interface LinkStateProps{
//     users: User[];
// }

// const mapStateToProps = (state: AppState): LinkStateProps => {
//     return { users: state.users }
// };

// export default connect(mapStateToProps, { addUser, setManager })(Signup);