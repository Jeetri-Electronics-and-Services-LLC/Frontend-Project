// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ReceiptPayment = () => {
//   const [formData, setFormData] = useState({
//     invoiceid: localStorage.getItem("selectedInvoiceId") || "",
//     createddate: new Date().toISOString().split("T")[0],
//     createdby: localStorage.getItem("username") || "",
//     paymentmethod: "",
//     deposital: "",
//     description: "",
//     amount: "",
//   });

//   const { id } = useParams(); // Get the ID from the URL
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [depositals, setDepositals] = useState([]);
  

//   useEffect(() => {
//     // Fetch dropdown options
//     const fetchDropdownOptions = async () => {
//       try {
//         const [paymentMethodsResponse, depositalsResponse] = await Promise.all([
//           axios.post("http://localhost:8080/paymentmethods/getallpaymentmethods"),
//           axios.post("http://localhost:8080/depositals/getalldepositals"),
//         ]);

//         if (Array.isArray(paymentMethodsResponse.data)) {
//           setPaymentMethods(paymentMethodsResponse.data);
//         }
//         if (Array.isArray(depositalsResponse.data)) {
//           setDepositals(depositalsResponse.data);
//         }
//       } catch (error) {
//         console.error("Error fetching dropdown options:", error);
//       }
//     };

//     // Fetch receipt payment details
//     const fetchReceiptPaymentDetails = async () => {
//         if (!id) return;
//         try {
//           const response = await axios.post(
        
//           "http://localhost:8080/receiptpayments/getreceiptpaymentsbyid",
//           { id }
//         );
//         if (response.data) {
//           setFormData((prev) => ({ ...prev, ...response.data }));
//         } else {
//           console.error("No data found for the given ID:", id);
//         }
//       } catch (error) {
//         console.error("Error fetching receipt payment details:", error);
//       }
//     };

//     fetchDropdownOptions();
//     fetchReceiptPaymentDetails();
//   }, [id]);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `http://localhost:8080/receiptpayments/updatereceipt/${id}`,
//         formData
//       );
//       alert("Receipt Payment updated successfully!");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error updating Receipt Payment");
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "600px",
//         margin: "auto",
//         padding: "20px",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//       }}
//     >
//       <h2>Edit Receipt Payment</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "10px" }}>
//           <p>Invoice ID: {formData.invoiceid}</p>
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Description:</label>
//           <input
//             type="text"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Created Date:</label>
//           <input
//             type="date"
//             name="createddate"
//             value={formData.createddate}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Created By:</label>
//           <input
//             type="text"
//             name="createdby"
//             value={formData.createdby}
//             readOnly
//             style={{
//               width: "100%",
//               padding: "8px",
//               background: "#f3f3f3",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Payment Method:</label>
//           <select
//             name="paymentmethod"
//             value={formData.paymentmethod}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px" }}
//           >
//             <option value="">Select Payment Method</option>
//             {paymentMethods.map((method) => (
//               <option key={method.name} value={method.value || method.name}>
//                 {method.label || method.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Deposital:</label>
//           <select
//             name="deposital"
//             value={formData.deposital}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px" }}
//           >
//             <option value="">Select Deposital</option>
//             {depositals.map((deposital) => (
//               <option key={deposital.name} value={deposital.value || deposital.name}>
//                 {deposital.label || deposital.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Amount:</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             padding: "10px 20px",
//             background: "#4caf50",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReceiptPayment;







import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './EditReceiptPayment.css';

const ReceiptPayment = () => {
  const [formData, setFormData] = useState({
    invoiceid: localStorage.getItem("selectedInvoiceId") || "",
    createddate: new Date().toISOString().split("T")[0],
    createdby: localStorage.getItem("username") || "",
    paymentmethod: "",
    deposital: "",
    description: "",
    amount: "",
  });

  const { id } = useParams(); // Get the ID from the URL
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [depositals, setDepositals] = useState([]);


  useEffect(() => {
    // Fetch dropdown options
    const fetchDropdownOptions = async () => {
      try {
        const [paymentMethodsResponse, depositalsResponse] = await Promise.all([
          axios.post("http://localhost:8080/paymentmethods/getallpaymentmethods"),
          axios.post("http://localhost:8080/depositals/getalldepositals"),
        ]);

        if (Array.isArray(paymentMethodsResponse.data)) {
          setPaymentMethods(paymentMethodsResponse.data);
        }
        if (Array.isArray(depositalsResponse.data)) {
          setDepositals(depositalsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    // Fetch receipt payment details
    const fetchReceiptPaymentDetails = async () => {
      if (!id) return;
      try {
        const response = await axios.post(

          "http://localhost:8080/receiptpayments/getreceiptpaymentsbyid",
          { id }
        );
        if (response.data) {
          setFormData((prev) => ({ ...prev, ...response.data }));
        } else {
          console.error("No data found for the given ID:", id);
        }
      } catch (error) {
        console.error("Error fetching receipt payment details:", error);
      }
    };

    fetchDropdownOptions();
    fetchReceiptPaymentDetails();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/receiptpayments/updatereceipt/${id}`,
        formData
      );
      alert("Receipt Payment updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error updating Receipt Payment");
    }
  };

  return (
    <div className="edit-receipt-payment">
      <h2>Edit Receipt Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="edit-receipt-payment-div">
          <p>Invoice ID: {formData.invoiceid}</p>
        </div>
        <div className="edit-receipt-payment-div">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}

          />
        </div>
        <div className="edit-receipt-payment-div">
          <label>Created Date:</label>
          <input
            type="date"
            name="createddate"
            value={formData.createddate}
            onChange={handleChange}

          />
        </div>
        <div className="edit-receipt-payment-div">
          <label>Created By:</label>
          <input
            type="text"
            name="createdby"
            value={formData.createdby}
            readOnly

          />
        </div>
        <div className="edit-receipt-payment-div">
          <label>Payment Method:</label>
          <select
            name="paymentmethod"
            value={formData.paymentmethod}
            onChange={handleChange}

          >
            <option value="">Select Payment Method</option>
            {paymentMethods.map((method) => (
              <option key={method.name} value={method.value || method.name}>
                {method.label || method.name}
              </option>
            ))}
          </select>
        </div>
        <div className="edit-receipt-payment-div">
          <label>Deposital:</label>
          <select
            name="deposital"
            value={formData.deposital}
            onChange={handleChange}

          >
            <option value="">Select Deposital</option>
            {depositals.map((deposital) => (
              <option key={deposital.name} value={deposital.value || deposital.name}>
                {deposital.label || deposital.name}
              </option>
            ))}
          </select>
        </div>
        <div className="edit-receipt-payment-div">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}

          />
        </div>
        <div className="edit-receipt-payment-button">
          <button type="submit">
            Update
          </button>
        </div>

      </form>
    </div>
  );
};

export default ReceiptPayment;