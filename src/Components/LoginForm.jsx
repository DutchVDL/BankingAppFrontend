/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/authenticate", formData)
      .then((response) => {
        props.profileData(response.data);

        props.logoutHandler();

        navigate("/profile");
      })
      .catch((error) => {
        console.error("Login failed:", error.response.data);
        setLoginError("Incorrect email or password. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your Password"
        />
      </div>
      <button type="submit" className="btn btn-info">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
