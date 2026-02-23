import React, { useState, useEffect } from "react";
import axios from "axios";
import './ExpenseForm.css';

const ExpenseForm = ({isOpen}) => {

  const [invoiceId, setInvoiceId] = useState("");
  const [accounts, setAccounts] = useState([]); // To store the fetched accounts
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

  useEffect(() => {
    // Fetch the list of accounts for the dropdown
    axios
      .post("http://localhost:8080/paidfromaccount/getAllpaidfromaccount")
      .then((response) => {
        setAccounts(response.data); // Assuming the response contains the accounts array
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });

    // Set the initial values for invoiceId, createdby, and createddate
    const username = localStorage.getItem("username") || "DefaultUser";
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const storedInvoiceId = localStorage.getItem("selectedInvoiceId");
    const storedCustomerName = localStorage.getItem("selectedCustomerName");
    const storedOrderType = localStorage.getItem("selectedOrderType");
    if (storedInvoiceId) {
      setInvoiceId(storedInvoiceId);
    }
    setFormData((prevData) => ({
      ...prevData,
      createdby: username,
      createddate: today,
      customerdisplayname_id: storedCustomerName || "", // Pre-fill customer display name
      ordertype: storedOrderType || "Expense",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!invoiceId) {
      alert("Invoice ID is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/expenses/addexpensebasedonid/${invoiceId}`, // Use a template literal to include invoiceId
        formData
      );
      alert("Expense submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting expense:", error.message);
      alert("Failed to submit expense.");
    }
  };

  return (
    <div className={`expense-form ${isOpen ? 'open' : ''}`}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="expense-form-div">
          <p>Invoice ID: {invoiceId}</p>
        </div>
        <div className="expense-form-div">
          <label>Order Type:</label>
          <input
            type="text"
            name="ordertype"
            value={formData.ordertype}
            readOnly // Prevent user from editing

          />
        </div>

        <div className="expense-form-div">
          <label>Customer Display Name:</label>
          <input
            type="text"
            name="customerdisplayname_id"
            value={formData.customerdisplayname_id}
            readOnly // Optional: Make it editable if needed

          />
        </div>

        <div className="expense-form-div">
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required

          />
        </div>
        <div className="expense-form-div">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required

          />
        </div>
        <div className="expense-form-div">
          <label>Paid From Account:</label>
          <select
            name="paidfromaccount"
            value={formData.paidfromaccount}
            onChange={handleChange}
            required

          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.name}>
                {account.name} {/* Replace with actual account name field */}
              </option>
            ))}
          </select>
        </div>
        {/* <div style={{ marginBottom: "10px" }}>
          <label>Created By:</label>
          <input
            type="text"
            name="createdby"
            value={formData.createdby}
            readOnly
            style={{ width: "100%", padding: "8px", marginTop: "5px", background: "#f3f3f3" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Created Date:</label>
          <input
            type="text"
            name="createddate"
            value={formData.createddate}
            readOnly
            style={{ width: "100%", padding: "8px", marginTop: "5px", background: "#f3f3f3" }}
          />
        </div> */}
        <div className="expense-form-button">
          <button
            type="submit"
            
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  );
};

export default ExpenseForm;