import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExpenseForm = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    invoiceid: "",
    ordertype: "",
    customerdisplayname_id: "",
    amount: "",
    description: "",
    paidfromaccount: "",
    createdby: "",
    createddate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch accounts for dropdown
    const fetchAccounts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/paidfromaccount/getAllpaidfromaccount"
        );
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error.message);
      }
    };

    // Fetch expense details by ID
    const fetchExpenseDetails = async () => {
      if (!id) return;
      try {
        const response = await axios.post(
          "http://localhost:8080/expenses/getexpensebyid",
          { id }
        );
        const expenseData = response.data;

        // Populate form fields
        setFormData({
          invoiceid: expenseData.invoiceid || "",
          ordertype: expenseData.ordertype || "Expense",
          customerdisplayname_id: expenseData.customerdisplayname_id || "",
          amount: expenseData.amount || "",
          description: expenseData.description || "",
          paidfromaccount: expenseData.paidfromaccount || "",
          createdby: expenseData.createdby || "",
          createddate: expenseData.createddate || "",
        });
      } catch (error) {
        console.error("Error fetching expense details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
    fetchExpenseDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/expenses/updateexpense/${id}`,
        formData
      );
      alert("Expense updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating expense:", error.message);
      alert("Failed to update expense.");
    }
  };

  if (loading) return <p>Loading expense data...</p>;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Edit Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <p>Invoice ID: {formData.invoiceid}</p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Order Type:</label>
          <input
            type="text"
            name="ordertype"
            value={formData.ordertype}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              background: "#f3f3f3",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Customer Display Name:</label>
          <input
            type="text"
            name="customerdisplayname_id"
            value={formData.customerdisplayname_id}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              background: "#f3f3f3",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Paid From Account:</label>
          <select
            name="paidfromaccount"
            value={formData.paidfromaccount}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.name}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Created By:</label>
          <input
            type="text"
            name="createdby"
            value={formData.createdby}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              background: "#f3f3f3",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Created Date:</label>
          <input
            type="text"
            name="createddate"
            value={formData.createddate}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              background: "#f3f3f3",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
