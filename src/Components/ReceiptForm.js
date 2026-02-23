import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReceiptForm.css';


const ReceiptPayment = () => {
  const [formData, setFormData] = useState({
    invoiceid: localStorage.getItem('selectedInvoiceId') || '',
    createddate: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD,
    createdby: localStorage.getItem('username') || '',
    paymentmethod: '',
    deposital: '',
    description: '',
    amount: '',
  });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [depositals, setDepositals] = useState([]);

  useEffect(() => {
    // Fetch dropdown options
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/paymentmethods/getallpaymentmethods"
        );
        if (response.data && Array.isArray(response.data)) {
          setPaymentMethods(response.data);
        } else {
          console.error(
            "Unexpected data format for payment methods",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    const fetchDepositals = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/depositals/getalldepositals"
        );
        if (response.data && Array.isArray(response.data)) {
          setDepositals(response.data);
        } else {
          console.error(
            "Unexpected data format for depositals",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching deposital options:", error);
      }
    };

    fetchPaymentMethods();
    fetchDepositals();

    // Populate initial values from localStorage
    const storedInvoiceId = localStorage.getItem("selectedInvoiceId");
    const storedCustomerName = localStorage.getItem("selectedCustomerName");
    const storedOrderType = localStorage.getItem("selectedOrderType");
    const username = localStorage.getItem("username") || "DefaultUser";

    // Set initial form data
    setFormData((prevData) => ({
      ...prevData,
      invoiceid: storedInvoiceId || "",
      customerdisplayname_id: storedCustomerName || "",
      ordertype: storedOrderType || "Receipt",
      createdby: username,
      createddate: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD,
    }));
  }, []); // Dependency array is empty to ensure this runs only on component mount



  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoiceId = formData.invoiceid;

    try {
      await axios.post(
        `http://localhost:8080/receiptpayments/add/${invoiceId}`,
        formData
      );
      alert("Receipt Payment created successfully!");
      // Optionally reset the form
      setFormData({
        invoiceid: "",
        ordertype: "",
        customerdisplayname_id: "",
        description: "",
        createddate: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD,
        createdby: localStorage.getItem("username") || "",
        paymentmethod: "",
        deposital: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };


  return (
    <div className='receipt-form'>

      <h2>Receipt Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className='receipt-form-first-div'>
          {/* <input type="text" name="invoiceid" value={formData.invoiceid} onChange={handleChange} readOnly />  */}
          <p>InvoiceId: {formData.invoiceid}</p>
        </div>
        <div className='receipt-form-second-div'>
          <label>Order Type:</label>
          <input
            type="text"
            name="ordertype"
            value={formData.ordertype}
            readOnly

          />
        </div>
        <div className='receipt-form-second-div'>
          <label>Customer Display Name:</label>
          <input
            type="text"
            name="customerdisplayname_id"
            value={formData.customerdisplayname_id}
            readOnly

          />
        </div>
        <div className='receipt-form-second-div'>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>


        {/* <div style={{ marginBottom: "10px" }}>
                    <label>CreatedDate:</label>
                    <input type="text" name="createddate" value={formData.createddate} onChange={handleChange}  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Created By:</label>
                    <input type="text" name="createdby" value={formData.createdby} onChange={handleChange} readOnly />
                </div> */}
        <div className='receipt-form-second-div'>
          <label>
            Payment Method:
            <select name="paymentmethod" value={formData.paymentmethod} onChange={handleChange}>
              <option value="">Select Payment Method</option>
              {paymentMethods.map((method) => (
                <option key={method.name} value={method.value || method.name}>{method.label || method.name}</option>
              ))}
            </select>
          </label>
        </div>

        <div className='receipt-form-second-div'>
          <label>                   Deposital:
            <select name="deposital" value={formData.deposital} onChange={handleChange}>
              <option value="">Select Deposital</option>
              {depositals.map((deposital) => (
                <option key={deposital.name} value={deposital.value || deposital.name}>{deposital.label || deposital.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className='receipt-form-second-div'>
          <label>Amount:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} />

        </div>
        <div className='receipt-form-button'>
          <button type="submit"
          >Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReceiptPayment;
