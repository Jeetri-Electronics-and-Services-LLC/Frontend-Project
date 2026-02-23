import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Receiptpaymentslist.css';

const ReceiptPayments = ({isOpen}) => {
  const [receiptPayments, setReceiptPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const navigate = useNavigate();

  // Fetch receipt payments
  useEffect(() => {
    const fetchReceiptPayments = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/receiptpayments/displaylistofreceiptpaymentparticularfields"
        );
        setReceiptPayments(response.data);
        setFilteredPayments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReceiptPayments();
  }, []);

  // Date range filter logic
  const applyDateFilter = useCallback(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfQuarter = new Date(
      now.getFullYear(),
      Math.floor(now.getMonth() / 3) * 3,
      1
    );
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31);

    const filtered = receiptPayments.filter((payment) => {
      const createdDate = new Date(payment.createddate);
      switch (dateFilter) {
        case "thisWeek":
          return createdDate >= startOfWeek;
        case "thisMonth":
          return createdDate >= startOfMonth;
        case "lastMonth":
          return createdDate >= startOfLastMonth && createdDate <= endOfLastMonth;
        case "thisQuarter":
          return createdDate >= startOfQuarter;
        case "thisYear":
          return createdDate >= startOfYear;
        case "lastYear":
          return createdDate >= startOfLastYear && createdDate <= endOfLastYear;
        default:
          return true;
      }
    });

    setFilteredPayments(filtered);
  }, [receiptPayments, dateFilter]);

  // Re-apply filters whenever dateFilter changes
  useEffect(() => {
    applyDateFilter();
  }, [applyDateFilter]);

  // Handle actions for each payment
  const handleActionSelect = (id, action) => {
    if (action === "edit") {
      navigate(`/editreceiptpayment/${id}`);
    } else if (action === "delete") {
      handleDelete(id);
    } else if (action === "show") {
      navigate(`/showreceiptpayment/${id}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost:8080/receiptpayments/deletereceiptpayment", { id });
      setReceiptPayments(receiptPayments.filter((payment) => payment.id !== id));
    } catch (err) {
      console.error("Failed to delete receipt payment:", err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`receiptpayments-list ${isOpen ? 'open' : ''}`}>
      <h2>Receipt Payments</h2>

      <div className="receiptpayments-list-div">
        <label>Filter by date range: </label>
        <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="thisQuarter">This Quarter</option>
          <option value="thisYear">This Year</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>

      <table className="receiptpayments-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Invoice ID</th>
            <th>Customer Name</th>
            <th>Created Date</th>
            <th>Payment Method</th>
            <th>Created By</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.invoiceid}</td>
                <td>{payment.customerdisplayname_id}</td>
                <td>{payment.createddate}</td>
                <td>{payment.paymentmethod}</td>
                <td>{payment.createdby}</td>
                <td>{payment.amount}</td>
                <td>
                  <select onChange={(e) => handleActionSelect(payment.id, e.target.value)}>
                    <option value="">Select Action</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    <option value="show">Show Receipt Payment</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No receipt payments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptPayments;
