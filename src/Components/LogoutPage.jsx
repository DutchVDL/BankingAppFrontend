/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const LogoutPage = (props) => {
  const logintandler = () => {
    props.logintHandler();
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 d-flex justify-content-center">
        <h4 className="text-center">Are you sure you want to log out?</h4>
        <div className="d-flex justify-content-around mt-5">
          <Link className="btn btn-danger mr-2" to="/" onClick={logintandler}>
            Logout
          </Link>
          <Link className="btn btn-info " to="/Profile">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
