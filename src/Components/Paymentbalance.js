// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom'; // Import useLocation

// const Paymentbalance = () => {
//   const [invoiceData, setInvoiceData] = useState(null);
//   const { id, customerName } = useLocation().state; // Use useLocation to get state

//   const [receiptpaymentamount, setReceiptPaymentAmount] = useState('');
//   const [formData, setFormData] = useState({
//     invoiceid: '',
//     customerdisplayname_id: '',
//     createddate: '',
//     createdby: '',
//     balanceamount: '',
//     receiptpaymentamount: '',
//     totalbalanceamount: ''
//   });

//   const loggedInUser = 'Alice Smith'; // You can replace this with dynamic user info if available.

//   useEffect(() => {
//     const fetchInvoiceData = async () => {
//       try {
//         const response = await axios.post(http://localhost:8080/invoices/dispalybalanceamount/${id});
//         setInvoiceData(response.data);
//         setFormData({
//           ...formData,
//           invoiceid: id,
//           customerdisplayname_id: response.data.customerdisplayname_id,
//           balanceamount: response.data.balanceamount,
//           createddate: new Date().toISOString().split('T')[0], // Today's date
//           createdby: loggedInUser,
//           totalbalanceamount: (parseFloat(response.data.balanceamount) - parseFloat(receiptpaymentamount)).toString()
//         });
//       } catch (error) {
//         console.error('Error fetching invoice data:', error);
//       }
//     };

//     fetchInvoiceData();
//   }, [id, receiptpaymentamount]);

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//     if (name === 'receiptpaymentamount') {
//       const newBalanceAmount = (parseFloat(formData.balanceamount) - parseFloat(value)).toString();
//       setFormData({
//         ...formData,
//         totalbalanceamount: newBalanceAmount
//       });
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(http://localhost:8080/paymentbalances/addpaymentbalance/${id}, formData);
//       console.log('Payment balance added successfully:', response.data);
//     } catch (error) {
//       console.error('Error submitting payment balance:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Payment Balance Form</h1>
//       {invoiceData ? (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Invoice ID</label>
//             <input
//               type="text"
//               name="invoiceid"
//               value={formData.invoiceid}
//               onChange={handleChange}
//               disabled
//             />
//           </div>
//           <div>
//             <label>Customer Display Name</label>
//             <input
//               type="text"
//               name="customerdisplayname_id"
//               value={formData.customerdisplayname_id}
//               onChange={handleChange}
//               disabled
//             />
//           </div>
//           <div>
//             <label>Balance Amount</label>
//             <input
//               type="text"
//               name="balanceamount"
//               value={formData.balanceamount}
//               onChange={handleChange}
//               disabled
//             />
//           </div>
//           <div>
//             <label>Receipt Payment Amount</label>
//             <input
//               type="number"
//               name="receiptpaymentamount"
//               value={receiptpaymentamount}
//               onChange={(e) => {
//                 setReceiptPaymentAmount(e.target.value);
//                 handleChange(e);
//               }}
//             />
//           </div>
//           <div>
//             <label>Total Balance Amount</label>
//             <input
//               type="text"
//               name="totalbalanceamount"
//               value={formData.totalbalanceamount}
//               onChange={handleChange}
//               disabled
//             />
//           </div>
//           <button type="submit">Submit Payment Balance</button>
//         </form>
//       ) : (
//         <p>Loading invoice data...</p>
//       )}
//     </div>
//   );
// };

// export default Paymentbalance;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './Paymentbalance.css';

const Paymentbalance = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [receiptpaymentamount, setReceiptPaymentAmount] = useState(0);
  const [formData, setFormData] = useState({
    invoiceid: '',
    customerdisplayname_id: '',
    createddate: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD,
    createdby: localStorage.getItem('username') || '',
    balanceamount: '',
    receiptpaymentamount: '',
    totalbalanceamount: ''
  });

  const { id, customerName } = useLocation().state; // Use useLocation to get state
  const username = localStorage.getItem("username") || "DefaultUser";


  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const invoiceResponse = await axios.post(`http://localhost:8080/invoices/dispalybalanceamount/${id}`);
        setInvoiceData(invoiceResponse.data);
        const balanceAmount = parseFloat(invoiceResponse.data.balanceamount);
        // Calculate total balance amount once invoice data is fetched
        const totalBalanceAmount = balanceAmount - receiptpaymentamount;
        setFormData({
          ...formData,
          invoiceid: id,
          customerdisplayname_id: invoiceResponse.data.customerdisplayname_id,
          balanceamount: invoiceResponse.data.balanceamount,
          createdby: username,
          createddate: new Date().toISOString().split("T")[0],
          totalbalanceamount: totalBalanceAmount.toString()
        });
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    const fetchReceiptPaymentAmount = async () => {
      try {
        const receiptPaymentResponse = await axios.post(
          'http://localhost:8080/receiptpayments/sumofallreceiptpaymentamountbyinvoiceid',
          { invoiceId: id }
        );
        const receiptAmount = receiptPaymentResponse.data;
        setReceiptPaymentAmount(receiptAmount); // Update receipt payment amount
        // Calculate total balance amount after fetching receipt payment amount
        if (invoiceData) {
          const balanceAmount = parseFloat(invoiceData.balanceamount);
          const totalBalanceAmount = balanceAmount - receiptAmount;
          setFormData({
            ...formData,
            receiptpaymentamount: receiptAmount.toString(),
            totalbalanceamount: totalBalanceAmount.toString()
          });
        }
      } catch (error) {
        console.error('Error fetching receipt payment amount:', error);
      }
    };

    fetchInvoiceData();
    fetchReceiptPaymentAmount();
  }, [id, receiptpaymentamount, invoiceData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'receiptpaymentamount') {
      const newBalanceAmount = (parseFloat(formData.balanceamount) - parseFloat(value)).toString();
      setFormData({
        ...formData,
        totalbalanceamount: newBalanceAmount
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/paymentbalances/addpaymentbalance/${id}`, formData);
      console.log('Payment balance added successfully:', response.data);

      // Show an alert when the data is saved successfully
      alert('Payment balance saved successfully!');
    } catch (error) {
      console.error('Error submitting payment balance:', error);
      // Show an error alert if the submission fails
      alert('Failed to save payment balance. Please try again.');
    }
  };


  return (
    <div className='payment-balance'>
      <h1>Payment Balance Form</h1>
      {invoiceData ? (
        <form onSubmit={handleSubmit} className='payment-balance-form'>
          <div className='payment-balance-div'>
            <label>Invoice ID</label>
            <input
              type="text"
              name="invoiceid"
              value={formData.invoiceid}
              onChange={handleChange}
              disabled
            />

            <label>Customer Display Name</label>
            <input
              type="text"
              name="customerdisplayname_id"
              value={formData.customerdisplayname_id}
              onChange={handleChange}
              disabled
            />

            <label>Balance Amount</label>
            <input
              type="text"
              name="balanceamount"
              value={formData.balanceamount}
              onChange={handleChange}
              disabled
            />

            <label>Receipt Payment Amount</label>
            <input
              type="number"
              name="receiptpaymentamount"
              value={receiptpaymentamount}
              onChange={(e) => {
                setReceiptPaymentAmount(e.target.value);
                handleChange(e);
              }}
            />

            <label>Total Balance Amount</label>
            <input
              type="text"
              name="totalbalanceamount"
              value={formData.totalbalanceamount}
              onChange={handleChange}
              disabled
            />
          </div>

          {/* <div style={{ marginBottom: "10px" }}>
                    <label>CreatedDate:</label>
                    <input type="text" name="createddate" value={formData.createddate} onChange={handleChange}  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Created By:</label>
                    <input type="text" name="createdby" value={formData.createdby} onChange={handleChange} readOnly />
                </div>  */}
                
          <div className='payment-balance-button'>
            <button type="submit">Submit Payment Balance</button>
          </div>

        </form>
      ) : (
        <p>Loading invoice data...</p>
      )}
    </div>
  );
};

export default Paymentbalance;