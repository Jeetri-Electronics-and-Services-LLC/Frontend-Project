// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";

// const PaymentBalanceList = () => {
//   const [paymentBalances, setPaymentBalances] = useState([]);
//   const [filteredPayments, setFilteredPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [dateFilter, setDateFilter] = useState("all");
  



//   useEffect(() => {
//     const fetchPaymentBalances = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/paymentbalances/displaylistofallpaymentbalance"
//         );
//         setPaymentBalances(response.data);
//       } catch (err) {
//         setError("Failed to fetch data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentBalances();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <h2>Payment Balance List</h2>
//       <table border="1" cellPadding="5" cellSpacing="0">
//         <thead>
//           <tr>
            
//             <th>Invoice ID</th>
//             <th>Customer Name</th>
//             <th>Created Date</th>
//             <th>Created By</th>
//             <th>Order Amount</th>
//             <th>Receipt Payment Amount</th>
//             <th>Total Balance Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paymentBalances.map((payment) => (
//             <tr key={payment.id}>
             
//               <td>{payment.invoiceId}</td>
//               <td>{payment.customerDisplayNameId}</td>
//               <td>{payment.createdDate}</td>
//               <td>{payment.createdBy}</td>
//               <td>{payment.balanceAmount}</td>
//               <td>{payment.receiptPaymentAmount}</td>
//               <td>{payment.totalBalanceAmount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PaymentBalanceList;





import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import './Paymentbalancelist.css';

const PaymentBalanceList = ({isOpen}) => {
  const [paymentBalances, setPaymentBalances] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    const fetchPaymentBalances = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/paymentbalances/displaylistofallpaymentbalance"
        );
        setPaymentBalances(response.data);
        setFilteredPayments(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentBalances();
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

    const filtered = paymentBalances.filter((payment) => {
      const createdDate = new Date(payment.createdDate);
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
  }, [paymentBalances, dateFilter]);

  useEffect(() => {
    applyDateFilter();
  }, [applyDateFilter]);

  // Calculate the sum of all receiptPaymentAmount values
  // Calculate the sum of all receiptPaymentAmount values
const totalReceiptPaymentAmount = filteredPayments.reduce(
  (sum, payment) => sum + (parseFloat(payment.receiptPaymentAmount) || 0),
  0
);

// Ensure it's a valid number before calling toFixed
const formattedTotal = isNaN(totalReceiptPaymentAmount)
  ? "0.00"
  : totalReceiptPaymentAmount.toFixed(2);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={`paymentbalance-list ${isOpen ? 'open' : ''}`}>
      <h2>Payment Balance List</h2>
      <div className="paymentbalance-list-div">
        <label>
          Filter by date range: 
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisQuarter">This Quarter</option>
            <option value="thisYear">This Year</option>
            <option value="lastYear">Last Year</option>
          </select>
        </label>
        <div className="paymentbalance-list=div">
          <strong>Total Receipt Payment Amount:</strong> ${totalReceiptPaymentAmount.toFixed(2)}
        </div>
      </div>
      <table className="paymentbalance-list-table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Customer Name</th>
            <th>Created Date</th>
            <th>Created By</th>
            <th>Order Amount</th>
            <th>Receipt Payment Amount</th>
            <th>Total Balance Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.invoiceId}</td>
                <td>{payment.customerDisplayNameId}</td>
                <td>{payment.createdDate}</td>
                <td>{payment.createdBy}</td>
                <td>{payment.balanceAmount}</td>
                <td>{payment.receiptPaymentAmount}</td>
                <td>{payment.totalBalanceAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No payment balances found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentBalanceList;
