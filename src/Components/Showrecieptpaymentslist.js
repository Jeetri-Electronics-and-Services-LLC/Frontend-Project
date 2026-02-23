// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Showrecieptpaymentslist = () => {
//   const [receiptPayments, setReceiptPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const invoiceId = localStorage.getItem("selectedInvoiceId");

//   useEffect(() => {
//     const fetchReceiptPayments = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/receiptpayments/displaylistofrpgetByInvoiceId",
//           { invoiceId: invoiceId }
//         );
//         setReceiptPayments(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchReceiptPayments();
//   }, [invoiceId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Receipt Payments List</h2>
//       <table border="1" cellPadding="10" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Customer Name</th>
//             <th>Description</th>
//             <th>Created Date</th>
//             <th>Payment Method</th>
//             <th>Deposital</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {receiptPayments.length > 0 ? (
//             receiptPayments.map((payment) => (
//               <tr key={payment.id}>
//                 <td>{payment.id}</td>
//                 <td>{payment.customerdisplayname_id}</td>
//                 <td>{payment.description}</td>
//                 <td>{payment.createddate}</td>
//                 <td>{payment.paymentmethod}</td>
//                 <td>{payment.deposital}</td>
//                 <td>{payment.amount}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7">No receipt payments found for this invoice</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Showrecieptpaymentslist;







import React, { useEffect, useState } from "react";
import axios from "axios";
import './Showrecieptpaymentslist.css';

const Showrecieptpaymentslist = ({isOpen}) => {
  const [receiptPayments, setReceiptPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const invoiceId = localStorage.getItem("selectedInvoiceId");

  useEffect(() => {
    const fetchReceiptPayments = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/receiptpayments/displaylistofrpgetByInvoiceId",
          { invoiceId: invoiceId }
        );
        setReceiptPayments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReceiptPayments();
  }, [invoiceId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`show-receipt-payment-list ${isOpen ? 'open' : ''}`}>
      <h2>Receipt Payments List</h2>
      <table className="show-receipt-payment-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Description</th>
            <th>Created Date</th>
            <th>Payment Method</th>
            <th>Deposital</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {receiptPayments.length > 0 ? (
            receiptPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.customerdisplayname_id}</td>
                <td>{payment.description}</td>
                <td>{payment.createddate}</td>
                <td>{payment.paymentmethod}</td>
                <td>{payment.deposital}</td>
                <td>{payment.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No receipt payments found for this invoice</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Showrecieptpaymentslist;