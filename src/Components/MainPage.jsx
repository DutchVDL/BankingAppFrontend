/* eslint-disable no-unused-vars */
import React from "react";

const MainPage = () => {
  return (
    <div className="container mt-5 bg-secondary">
      <h1 className="text-center mb-4">Welcome to Demo Bank Application</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body bg-warning">
              <h5 className="card-title">Account Management</h5>
              <p className="card-text">
                Manage your bank accounts, view account details, and perform
                transactions such as transfers and payments.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body bg-warning">
              <h5 className="card-title">Transaction History</h5>
              <p className="card-text">
                Keep track of all your account transactions, view transaction
                history, and monitor your spending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
