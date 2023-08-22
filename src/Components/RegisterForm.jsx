/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

// export default RegisterForm;
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });

  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);
  const [isLastNameEmpty, setIsLastNameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);

  const [successfulRegistration, setSuccessfulRegistration] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstname":
        setIsFirstNameEmpty(value.trim() === "");
        break;
      case "lastname":
        setIsLastNameEmpty(value.trim() === "");
        break;
      case "email":
        setIsEmailEmpty(value.trim() === "");
        break;
      case "password":
        setIsPasswordEmpty(value.trim() === "");
        break;
      case "username":
        setIsUsernameEmpty(value.trim() === "");
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/register", formData)
      .then((response) => {
        alert("Registration successful:");
        setSuccessfulRegistration((prev) => !prev);
      })
      .catch((error) => {
        console.error("Registration failed");
      });

    setTimeout(() => {
      setIsRegistered(true);
    }, 2000);
  };

  return (
    <div>
      {isRegistered ? (
        <div className="alert alert-success" role="alert">
          Registration was successful!
        </div>
      ) : null}

      {successfulRegistration && (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              name="firstname"
              className={`form-control ${isFirstNameEmpty && "border-danger"}`}
              value={formData.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Please enter your First Name"
              minLength={3}
              maxLength={55}
            />

            {isFirstNameEmpty && (
              <small id="firstnameEmpty" className="form-text text-danger">
                First Name can't be Empty!!!
              </small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              name="lastname"
              className={`form-control ${isLastNameEmpty && "border-danger"}`}
              value={formData.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Please enter your Last Name"
              minLength={3}
              maxLength={55}
            />
            {isLastNameEmpty && (
              <small id="lastnameEmpty" className="form-text text-danger">
                Last Name can't be Empty!!!
              </small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className={`form-control ${isEmailEmpty && "border-danger"}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Please enter your Email"
              minLength={8}
              maxLength={55}
            />
            {isEmailEmpty && (
              <small id="emailEmpty" className="form-text text-danger">
                Email can't be Empty!!!
              </small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              className={`form-control ${isPasswordEmpty && "border-danger"}`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Please enter your Password"
              minLength={8}
              maxLength={55}
            />
            {isPasswordEmpty && (
              <small id="passwordEmpty" className="form-text text-danger">
                Password can't be Empty!!!
              </small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              className={`form-control ${isUsernameEmpty && "border-danger"}`}
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Please enter your Username"
              minLength={8}
              maxLength={55}
            />
            {isUsernameEmpty && (
              <small id="usernameEmpty" className="form-text text-danger">
                Username can't be Empty!!!
              </small>
            )}
          </div>
          <button type="submit" className="btn btn-info">
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
