/* eslint-disable no-unused-vars */

// export default Account;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
export const Account = () => {
  const { accountId } = useParams();
  const navigator = useNavigate();
  const [account, setAccount] = useState({});
  const [renderPage, setRenderPage] = useState(true);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  useEffect(() => {
    fetchAccountDetails();
  }, [renderPage]);

  const fetchAccountDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/accounts/${accountId}`
      );

      setAccount(response.data);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  const [transactionAmount, setTransactionAmount] = useState("");
  const [withdrawalError, setWithdrawalError] = useState("");

  const handleDeposit = async () => {
    const transactionType = "DEPOSIT";

    if (withdrawalAmount > account.balance) {
      setWithdrawalError("Withdrawal amount exceeds account balance.");

      return;
    }
    try {
      const transactionData = {
        accountName: account.accountName,
        transaction: transactionAmount,
        transactionType: transactionType,
      };

      const response = await axios.post(
        `http://localhost:8080/accounts/deposit/${account.accountName}`,
        transactionData
      );
      setRenderPage((prev) => !prev);

      setTransactionAmount("");
      setTransactionSuccess(true);
      setTimeout(() => {
        setTransactionSuccess(false);
      }, 3000);
      console.log("Deposit transaction successful:", response.data);
    } catch (error) {
      console.error("Error depositing money:", error);
    }
  };

  //withdraw

  const [withdrawalAmount, setWithdrawalAmount] = useState();

  const handleWithdrawal = async () => {
    const transactionType = "WITHDRAWAL";

    if (withdrawalAmount > account.balance) {
      setWithdrawalError("Withdrawal amount exceeds account balance.");

      return;
    }

    try {
      const transactionData = {
        accountName: account.accountName,
        transaction: withdrawalAmount,
        transactionType: transactionType,
      };

      const response = await axios.post(
        `http://localhost:8080/accounts/withdraw/${account.accountName}`,
        transactionData
      );

      setRenderPage((prev) => !prev);
      setWithdrawalAmount("");
      setWithdrawalError("");
      setTransactionSuccess(true);
      setTimeout(() => {
        setTransactionSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = () => {
    axios
      .delete(`http://localhost:8080/accounts/${accountId}`)
      .then((response) => {
        console.log("Account deleted successfully:", response.data);
        navigator("/Profile");
      })

      .catch((error) => {
        console.error("Account deletion failed:", error.response.data);
      });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex   justify-content-between align-items-center mb-4">
        <h1 className=" ">Account Details</h1>
        <Link to="/Profile" className="btn btn-warning ">
          Back
        </Link>
      </div>

      <div className="border p-3 mb-4 d-flex justify-content-between ">
        <div>
          <h2 className="mb-3">Account Name: {account.accountName}</h2>
          <h2 className="mb-3">Balance: {account.balance} $</h2>
        </div>
        <div
          className="w-50 d-flex flex-column "
          style={{ alignItems: "flex-end" }}
        >
          <button className="btn btn-danger" onClick={deleteAccount}>
            Delete the Account
          </button>
          <p>
            The deletion of the account will result in the loss of all its
            funds. Please make sure to transfer the funds before proceeding with
            the account deletion.
          </p>
        </div>
      </div>

      <div>
        {transactionSuccess && (
          <div className="alert alert-success mt-3">
            Transaction was successful!
          </div>
        )}
        <div className="form-group">
          <label htmlFor="transactionAmount">Deposit Amount:</label>
          <input
            type="number"
            className="form-control"
            id="transactionAmount"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
        </div>
        <button className="btn btn-success" onClick={handleDeposit}>
          Deposit
        </button>
      </div>

      <div>
        <div className="form-group">
          <label htmlFor="transactionAmount">Withdrawal Amount:</label>
          <input
            type="number"
            className="form-control"
            id="transactionAmount"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
          />
        </div>
        {withdrawalError && (
          <div className="alert alert-danger">{withdrawalError}</div>
        )}
        <button className="btn btn-danger" onClick={handleWithdrawal}>
          Withdraw
        </button>
      </div>

      <div className="border p-3">
        <h2 className="mb-3">Transactions</h2>
        {account.transactions && (
          <ul className="list-group">
            {account.transactions.map((transaction) => (
              <li
                key={transaction.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  transaction.balance < 0 ? "bg-danger" : "bg-success"
                }`}
              >
                <span
                  className={
                    transaction.balance < 0 ? "bg-danger" : "bg-success"
                  }
                >
                  | Balance: {transaction.balance} | Time:{" "}
                  {new Date(transaction.timestamp).toLocaleTimeString()}
                </span>
                <span className="badge bg-warning rounded-pill">
                  {transaction.type}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
