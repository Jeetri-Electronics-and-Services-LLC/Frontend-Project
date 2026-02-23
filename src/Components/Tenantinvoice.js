// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import "./Tenantestimate.css";

// const columns = [
//   "pluming",
//   "framing",
//   "hvac",
//   "electrical",
//   "dropdownceiling",
//   "sheetrockceiling",
//   "flooring",
//   "itemdescription",
//   "price"
// ];

// const TenantInvoice = () => {
//   const { state } = useLocation();
//   const customerId = state?.customerId;
//   const estimateData = state?.estimateData;

//   const [customer, setCustomer] = useState({
//     customerId: "",
//     customerName: ""
//   });

//   const [row, setRow] = useState(estimateData || {});

//   /* FETCH CUSTOMER */
//   useEffect(() => {
//     if (!customerId) return;

//     axios
//       .post("http://localhost:8080/customers/getCustomerByIdname", { customerId })
//       .then(res =>
//         setCustomer({
//           customerId: res.data.id,
//           customerName: res.data.customerName
//         })
//       );
//   }, [customerId]);

//   /* SAVE INVOICE (POSTMAN FORMAT) */
//   const saveInvoice = async () => {
//     const payload = {
//       customerId,
//       ...row
//     };

//     console.log("Invoice payload:", payload);

//     await axios.post(
//       "http://localhost:8080/tenanteinvoice/addtenanteinvoice",
//       payload
//     );

//     alert("Tenant Invoice Saved Successfully");
//   };

//   return (
//     <div className="tenant-estimate-container">
//       <h2>Tenant Improvement – Project Invoice</h2>

//       <div className="customer-info">
//         <div><b>Customer ID:</b> {customer.customerId}</div>
//         <div><b>Customer Name:</b> {customer.customerName}</div>
//       </div>

//       <table className="tenant-estimate-table">
//         <thead>
//           <tr>
//             {columns.map(col => <th key={col}>{col}</th>)}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             {columns.map(col => (
//               <td key={col}>
//                 <input value={row[col]} readOnly />
//               </td>
//             ))}
//           </tr>
//         </tbody>
//       </table>

//       <div className="tenant-estimate-buttons">
//         <button onClick={saveInvoice}>Save Invoice</button>
//       </div>
//     </div>
//   );
// };

// export default TenantInvoice;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Tenantinvoice.css";

const costFields = [
  "pluming",
  "framing",
  "hvac",
  "electrical",
  "dropdownceiling",
  "sheetrockceiling",
  "flooring"
];

const SALES_TAX_PERCENT = 8.25;

const TenantInvoice = ({ isOpen }) => {
  const { state } = useLocation();

  const customerId = state?.customerId || "";
  const estimateData = state?.estimateData || null;

  const [customer, setCustomer] = useState({
    customerId: "",
    customerName: ""
  });

  const [row, setRow] = useState({
    pluming: "",
    framing: "",
    hvac: "",
    electrical: "",
    dropdownceiling: "",
    sheetrockceiling: "",
    flooring: "",
    itemdescription: "",
    price: 0,
    salestax: SALES_TAX_PERCENT,
    custom: "",
    grandtotal: 0
  });

  /* LOAD DATA FROM ESTIMATE */
  useEffect(() => {
    if (estimateData) {
      setRow({ ...estimateData });
    }
  }, [estimateData]);

  /* FETCH CUSTOMER */
  useEffect(() => {
    if (!customerId) return;

    axios
      .post("http://localhost:8080/customers/getCustomerByIdname", { customerId })
      .then(res =>
        setCustomer({
          customerId: res.data.id,
          customerName: res.data.customerName
        })
      )
      .catch(err => console.error(err));
  }, [customerId]);

  /* CALCULATIONS */
  const calculateTotals = updated => {
    const price = costFields.reduce((sum, f) => sum + Number(updated[f] || 0), 0);
    const salesTaxAmount = (price * SALES_TAX_PERCENT) / 100;
    const customAmount = Number(updated.custom || 0);

    updated.price = price.toFixed(2);
    updated.grandtotal = (price + salesTaxAmount + customAmount).toFixed(2);
  };

  const handleChange = (field, value) => {
    const updated = { ...row, [field]: value };
    calculateTotals(updated);
    setRow(updated);
  };

  /* SAVE */
  const saveInvoice = async () => {
    try {
      await axios.post(
        "http://localhost:8080/tenanteinvoice/addtenanteinvoice",
        { customerId, ...row }
      );
      alert("Tenant Invoice Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save invoice");
    }
  };

  return (
    <div className={`tenantInvoice-wrapper ${isOpen ? "sidebar-open" : ""}`}>

      <div className="tenantInvoice-container">
        <div className="tenantInvoice-box">

          <h2>Tenant Improvement – Project Invoice</h2>

          {/* CUSTOMER INFO */}
          <div className="tenantInvoice-customerInfo">
            <div><b>Customer ID:</b> {customer.customerId}</div>
            <div><b>Customer Name:</b> {customer.customerName}</div>
          </div>

          {/* FORM GRID */}
          <div className="tenantInvoice-formGrid">

            {costFields.map(field => (
              <div
                key={field}
                className={`tenantInvoice-row ${row[field] ? "tenantInvoice-activeRow" : ""}`}
              >
                <label className="tenantInvoice-label">
                  {field.toUpperCase()}
                </label>
                <input
                  className="tenantInvoice-input"
                  type="number"
                  value={row[field]}
                  onChange={e => handleChange(field, e.target.value)}
                />
              </div>
            ))}

            {/* DESCRIPTION */}
            <div className={`tenantInvoice-row ${row.itemdescription ? "tenantInvoice-activeRow" : ""}`}>
              <label className="tenantInvoice-label">Item Description</label>
              <input
                className="tenantInvoice-input"
                value={row.itemdescription}
                onChange={e => handleChange("itemdescription", e.target.value)}
              />
            </div>

            {/* TOTAL PRICE */}
            <div className="tenantInvoice-row">
              <label className="tenantInvoice-label">Total Price</label>
              <input className="tenantInvoice-input" value={row.price} readOnly />
            </div>

            {/* SALES TAX */}
            <div className="tenantInvoice-row">
              <label className="tenantInvoice-label">Sales Tax</label>
              <input className="tenantInvoice-input" value={`${SALES_TAX_PERCENT}%`} readOnly />
            </div>

            {/* CUSTOM */}
            <div className={`tenantInvoice-row ${row.custom ? "tenantInvoice-activeRow" : ""}`}>
              <label className="tenantInvoice-label">Custom Charges</label>
              <input
                className="tenantInvoice-input"
                type="number"
                value={row.custom}
                onChange={e => handleChange("custom", e.target.value)}
              />
            </div>

            {/* GRAND TOTAL */}
            <div className="tenantInvoice-row tenantInvoice-totalRow">
              <label className="tenantInvoice-label">Grand Total</label>
              <input className="tenantInvoice-input" value={row.grandtotal} readOnly />
            </div>

          </div>

          {/* BUTTON */}
          <div className="tenantInvoice-buttonBox">
            <button onClick={saveInvoice}>Save Invoice</button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TenantInvoice;