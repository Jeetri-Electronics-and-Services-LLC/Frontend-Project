import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tenantepayment.css";

const TenantPayment = ({ isOpen }) => {
  const [tableData, setTableData] = useState({
    customerid: "",
    customername: "",
    date: "",
    balance: "",
    invoiceId: "",
  });

  /* FETCH TENANT INVOICE DETAILS */
  useEffect(() => {
    fetchInvoiceDetails();
  }, []);

  const fetchInvoiceDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/tenanteinvoice/tenanteinvoicedetails/2"
      );

      setTableData({
        customerid: res.data.customerId,
        customername: res.data.customerDisplayName,
        balance: res.data.grandTotal,
        invoiceId: res.data.tenanteInvoiceId,
        date: "",
      });
    } catch (error) {
      console.error("Error fetching invoice details", error);
    }
  };

  /* HANDLE INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableData({ ...tableData, [name]: value });
  };

  /* SAVE PAYMENT */
  const handleSubmit = async () => {
    const payload = {
      customerid: tableData.customerid,
      customername: tableData.customername,
      date: tableData.date,
      balance: tableData.balance,
    };

    try {
      await axios.post(
        "http://localhost:8080/tenant-payments/addtenant-paymentswithinvoice",
        payload
      );
      alert("Tenant payment saved successfully!");
    } catch (error) {
      console.error("Error saving payment", error);
      alert("Failed to save payment");
    }
  };

  return (
    <div className={`tenantPay-wrapper ${isOpen ? "sidebar-open" : ""}`}>

      <div className="tenantPay-page">

        <div className="tenantPay-box">
          <h2>Tenant Payment</h2>

          <table className="tenantPay-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{tableData.invoiceId}</td>
                <td>{tableData.customerid}</td>
                <td>{tableData.customername}</td>
                <td>
                  <input
                    type="date"
                    name="date"
                    value={tableData.date}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="balance"
                    value={tableData.balance}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="tenantPay-btnBox">
            <button onClick={handleSubmit}>Save Payment</button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default TenantPayment;