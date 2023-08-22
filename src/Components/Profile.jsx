/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Profile = ({ data }) => {
  const [accountName, setAccountName] = useState("");
  const [userData, setUserData] = useState(data);
  const [accounts, setAccounts] = useState([]);

  const [transferError, setTransferError] = useState("");

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const handleAccountNameChange = (e) => {
    setAccountName(e.target.value);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();

    const requestData = {
      accName: accountName,
      email: data.email,
    };

    axios
      .post("http://localhost:8080/api/auth/accounts", requestData)
      .then((response) => {
        console.log("Account created successfully:", response.data);

        const updatedUserData = response.data;

        setUserData(updatedUserData);
      })
      .catch((error) => {
        console.error("Account creation failed:", error.response.data);
      });

    setAccountName("");
  };

  //

  useEffect(() => {
    fetchAccounts();
  }, [userData]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/accounts/${data.email}`
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const allAcounts = (
    <div className="row mt-5">
      <div className="col">
        <h2 className="text-center mb-5">Accounts:</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {accounts
            ? accounts.map((account) => (
                <div key={account.id} className="col">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-left">
                        <span className="text-secondary">Account Name</span> -{" "}
                        {account.accountName}
                      </h5>

                      <div className="d-grid justify-content-center">
                        <Link
                          to={`/Profile/${account.id}`}
                          className="btn btn-success"
                        >
                          View Account
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );

  //transfer

  const [transferFromAccountId, setTransferFromAccountId] = useState("");
  const [transferToAccountId, setTransferToAccountId] = useState("");
  const [amount, setAmount] = useState();
  const handleTransferFromChange = (e) => {
    setTransferFromAccountId(e.target.value);
  };

  const handleTransferToChange = (e) => {
    setTransferToAccountId(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    // Check if the user is trying to transfer money to the same account
    if (transferFromAccountId === transferToAccountId) {
      setTransferError("Cannot transfer money to the same account.");
      return;
    }

    // Check if the user hasn't selected an account for transfer or hasn't entered an amount
    if (!transferFromAccountId || !transferToAccountId || !amount) {
      setTransferError(
        "Please select both accounts and enter the transfer amount."
      );
      return;
    }

    const requestData = {
      accountOne: transferFromAccountId,
      accountTwo: transferToAccountId,
      transactionCreationRequest: {
        transaction: amount,
        timestamp: new Date().toISOString(), // Use the current timestamp
        transactionType: "TRANSFER",
      },
    };

    axios
      .post("http://localhost:8080/accounts/transfer", requestData)
      .then((response) => {
        console.log("Transfer successful:", response.data);
        setTransferError("");
      })
      .catch((error) => {
        console.error("Transfer failed:", error.response.data);
        setTransferError("Insufficient funds. Please enter a valid amount.");
      });

    setAmount();
    setTransferFromAccountId("");
    setTransferToAccountId("");
  };

  return (
    <div className="container mt-5 ">
      {userData && (
        <>
          <div className="row ">
            <div className="col-md-6">
              <div className="card p-4 h-100 bg-light">
                <h1>Welcome, {userData.nickname}!</h1>
                <p>Email: {userData.email}</p>
                <p>First Name: {userData.firstname}</p>
                <p>Last Name: {userData.lastname}</p>
                <p>Role: {userData.role}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-4 h-100 bg-light">
                <form onSubmit={handleCreateAccount}>
                  <div className="mb-3 d-flex gap-3 flex-column align-items-center ">
                    <label htmlFor="accountName" className="form-label">
                      Account Name:
                    </label>
                    <input
                      type="text"
                      id="accountName"
                      name="accountName"
                      className="form-control"
                      value={accountName}
                      onChange={handleAccountNameChange}
                      placeholder="Enter Account Name"
                      required
                      minLength={5}
                      maxLength={30}
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Create Account
                  </button>
                </form>
              </div>
            </div>
          </div>
          {allAcounts}
        </>
      )}

      <form onSubmit={handleTransfer}>
        <div className="mb-3 d-flex gap-3 flex-column align-items-center">
          <label htmlFor="transferFrom" className="form-label">
            Transfer From Account:
          </label>
          <select
            id="transferFrom"
            name="transferFrom"
            className="form-select"
            value={transferFromAccountId}
            onChange={handleTransferFromChange}
            required
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.accName}>
                {account.accountName}
              </option>
            ))}
          </select>
          <label htmlFor="transferTo" className="form-label">
            Transfer To Account:
          </label>
          <select
            id="transferTo"
            name="transferTo"
            className="form-select"
            value={transferToAccountId}
            onChange={handleTransferToChange}
            required
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.accName}>
                {account.accountName}
              </option>
            ))}
          </select>
          <label htmlFor="amount" className="form-label">
            Amount to Transfer:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="form-control"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter Amount"
            required
          />
        </div>
        {transferError && (
          <div className="alert alert-danger">{transferError}</div>
        )}
        <button type="submit" className="btn btn-success">
          Transfer Money
        </button>
      </form>
    </div>
  );
};
