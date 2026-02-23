// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./Tenantestimate.css";

// /* ===============================
//    COLUMN DEFINITIONS
// ================================ */
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

// const costFields = [
//   "pluming",
//   "framing",
//   "hvac",
//   "electrical",
//   "dropdownceiling",
//   "sheetrockceiling",
//   "flooring"
// ];

// const Tenantestimate = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const customerId = state?.customerId;

//   /* ===============================
//      STATE
//   ================================ */
//   const [customer, setCustomer] = useState({
//     customerId: "",
//     customerName: ""
//   });

//   const [row, setRow] = useState(
//     Object.fromEntries(columns.map(c => [c, ""]))
//   );

//   /* ===============================
//      FETCH CUSTOMER ID & NAME
//   ================================ */
//   useEffect(() => {
//     if (!customerId) return;

//     axios
//       .post("http://localhost:8080/customers/getCustomerByIdname", {
//         customerId
//       })
//       .then(res => {
//         setCustomer({
//           customerId: res.data.id,
//           customerName: res.data.customerName
//         });
//       })
//       .catch(err => console.error(err));
//   }, [customerId]);

//   /* ===============================
//      HANDLE CHANGE
//   ================================ */
//   const handleChange = (field, value) => {
//     const updated = { ...row, [field]: value };

//     // Auto calculate price
//     updated.price = costFields.reduce(
//       (sum, f) => sum + Number(updated[f] || 0),
//       0
//     );

//     setRow(updated);
//   };

//   /* ===============================
//      SAVE ESTIMATE (POSTMAN FORMAT)
//   ================================ */
//   const saveEstimate = async () => {
//     const payload = {
//       customerId,
//       pluming: row.pluming,
//       framing: row.framing,
//       hvac: row.hvac,
//       electrical: row.electrical,
//       dropdownceiling: row.dropdownceiling,
//       sheetrockceiling: row.sheetrockceiling,
//       flooring: row.flooring,
//       itemdescription: row.itemdescription,
//       price: row.price
//     };

//     console.log("Saving payload:", payload);

//     try {
//       await axios.post(
//         "http://localhost:8080/tenantestimate/addtenantestimate",
//         payload
//       );
//       alert("Tenant Estimate Saved Successfully");
//     } catch (error) {
//       console.error("Save error:", error);
//       alert("Failed to save estimate");
//     }
//   };

//   const convertToInvoice = () => {
//     navigate("/tenantinvoice", {
//       state: {
//         customerId,
//         estimateData: row
//       }
//     });
//   };

//   return (
//     <div className="tenant-estimate-container">
//       <h2>Tenant Improvement – Project Estimate</h2>

//       {/* CUSTOMER INFO */}
//       <div className="customer-info">
//         <div><b>Customer ID:</b> {customer.customerId}</div>
//         <div><b>Customer Name:</b> {customer.customerName}</div>
//       </div>

//       {/* TABLE */}
//       <table className="tenant-estimate-table">
//         <thead>
//           <tr>
//             {columns.map(col => (
//               <th key={col}>{col}</th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             {columns.map(col => (
//               <td key={col}>
//                 {col === "price" ? (
//                   <input value={row.price} readOnly />
//                 ) : col === "itemdescription" ? (
//                   <input
//                     value={row[col]}
//                     onChange={e =>
//                       handleChange(col, e.target.value)
//                     }
//                   />
//                 ) : (
//                   <input
//                     type="number"
//                     value={row[col]}
//                     onChange={e =>
//                       handleChange(col, e.target.value)
//                     }
//                   />
//                 )}
//               </td>
//             ))}
//           </tr>
//         </tbody>
//       </table>

//       {/* BUTTON */}
//       <div className="tenant-estimate-buttons">
//         <button onClick={saveEstimate}>Save Estimate</button>
//       </div>

//       <div className="tenant-estimate-buttons">
//         <button onClick={convertToInvoice}>
//           Convert to Invoice
//         </button>
//       </div>
//     </div>

    
//   );
// };

// export default Tenantestimate;







import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Tenantestimate.css";

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

const TenantEstimate = ({ isOpen }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const customerId = state?.customerId;

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

  /* FETCH CUSTOMER */
  useEffect(() => {
    if (!customerId) return;

    axios
      .post("http://localhost:8080/customers/getCustomerByIdname", { customerId })
      .then(res => {
        setCustomer({
          customerId: res.data.id,
          customerName: res.data.customerName
        });
      })
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

  /* SAVE ESTIMATE */
  const saveEstimate = async () => {
    try {
      await axios.post("http://localhost:8080/tenantestimate/addtenantestimate", {
        customerId,
        ...row
      });
      alert("Tenant Estimate Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save estimate");
    }
  };

  /* CONVERT TO INVOICE */
  const convertToInvoice = () => {
    navigate("/tenantinvoice", {
      state: { customerId, estimateData: row }
    });
  };

  return (
    // 🔥 MAIN WRAPPER THAT MOVES WITH SIDEBAR
    <div className={`tenantEstimate-main ${isOpen ? "sidebar-open" : ""}`}>

      {/* CENTER PAGE */}
      <div className="tenantEstimate-page">
        <div className="tenantEstimate-box">

          <h2>Tenant Improvement – Project Estimate</h2>

          {/* CUSTOMER INFO */}
          <div className="tenantEstimate-customerInfo">
            <div><b>Customer ID:</b> {customer.customerId}</div>
            <div><b>Customer Name:</b> {customer.customerName}</div>
          </div>

          {/* FORM GRID */}
          <div className="tenantEstimate-formGrid">

            {costFields.map(field => (
              <div
                key={field}
                className={`tenantEstimate-row ${row[field] ? "tenantEstimate-activeRow" : ""}`}
              >
                <label className="tenantEstimate-label">
                  {field.toUpperCase()}
                </label>
                <input
                  className="tenantEstimate-input"
                  type="number"
                  value={row[field]}
                  onChange={e => handleChange(field, e.target.value)}
                />
              </div>
            ))}

            {/* DESCRIPTION */}
            <div className={`tenantEstimate-row ${row.itemdescription ? "tenantEstimate-activeRow" : ""}`}>
              <label className="tenantEstimate-label">Item Description</label>
              <input
                className="tenantEstimate-input"
                value={row.itemdescription}
                onChange={e => handleChange("itemdescription", e.target.value)}
              />
            </div>

            {/* TOTAL PRICE */}
            <div className="tenantEstimate-row">
              <label className="tenantEstimate-label">Total Price</label>
              <input className="tenantEstimate-input" value={row.price} readOnly />
            </div>

            {/* SALES TAX */}
            <div className="tenantEstimate-row">
              <label className="tenantEstimate-label">Sales Tax</label>
              <input className="tenantEstimate-input" value={`${SALES_TAX_PERCENT}%`} readOnly />
            </div>

            {/* CUSTOM */}
            <div className={`tenantEstimate-row ${row.custom ? "tenantEstimate-activeRow" : ""}`}>
              <label className="tenantEstimate-label">Custom Charges</label>
              <input
                className="tenantEstimate-input"
                type="number"
                value={row.custom}
                onChange={e => handleChange("custom", e.target.value)}
              />
            </div>

            {/* GRAND TOTAL */}
            <div className="tenantEstimate-row tenantEstimate-totalRow">
              <label className="tenantEstimate-label">Grand Total</label>
              <input className="tenantEstimate-input" value={row.grandtotal} readOnly />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="tenantEstimate-buttonBox">
            <button onClick={saveEstimate}>Save Estimate</button>
            <button onClick={convertToInvoice}>Convert to Invoice</button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TenantEstimate;