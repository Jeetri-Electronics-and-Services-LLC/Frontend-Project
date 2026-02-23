// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const CustomerInvoices = () => {
//   const { customerdisplayname } = useParams();
//   const [invoices, setInvoices] = useState([]);
//   const [filteredInvoices, setFilteredInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dateFilter, setDateFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const itemsPerPage = 4;
//   const navigate = useNavigate();

//   // Fetch invoices on component mount
//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/invoices/Displaylistofinvoicesparticularfields"
//         );
//         const sortedInvoices = response.data.sort(
//           (a, b) => new Date(b.createddate) - new Date(a.createddate)
//         );
//         setInvoices(sortedInvoices);
//         setFilteredInvoices(sortedInvoices);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, [customerdisplayname]);

//   // Apply filters (date range and status)
//   const applyFilters = useCallback(() => {
//     const now = new Date();
//     const filtered = invoices.filter((invoice) => {
//       const createdDate = new Date(invoice.createddate);

//       const dateFilterPass = (() => {
//         switch (dateFilter) {
//           case "thisWeek":
//             const startOfWeek = new Date(now);
//             startOfWeek.setDate(now.getDate() - now.getDay());
//             return createdDate >= startOfWeek;
//           case "thisMonth":
//             return (
//               createdDate.getMonth() === now.getMonth() &&
//               createdDate.getFullYear() === now.getFullYear()
//             );
//           case "lastMonth":
//             const lastMonth = new Date(now);
//             lastMonth.setMonth(now.getMonth() - 1);
//             return (
//               createdDate.getMonth() === lastMonth.getMonth() &&
//               createdDate.getFullYear() === lastMonth.getFullYear()
//             );
//           case "thisQuarter":
//             const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
//             const quarterStartDate = new Date(now.getFullYear(), quarterStartMonth, 1);
//             return createdDate >= quarterStartDate;
//           case "thisYear":
//             return createdDate.getFullYear() === now.getFullYear();
//           case "lastYear":
//             return createdDate.getFullYear() === now.getFullYear() - 1;
//           default:
//             return true;
//         }
//       })();

//       const statusFilterPass =
//         statusFilter === "all" || invoice.status_id === statusFilter;

//       return dateFilterPass && statusFilterPass;
//     });

//     setFilteredInvoices(filtered);
//     setCurrentPage(1);
//   }, [invoices, dateFilter, statusFilter]);

//   // Re-apply filters whenever the filter states change
//   useEffect(() => {
//     applyFilters();
//   }, [applyFilters]);


//     // Handle edit action
//   const handleEdit = async (ordertype, id) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/ordersinvoiceestimate/basedonordertype",
//         { ordertype, id }
//       );

//       const data = response.data;

//       // Store fetched details in local storage or state as needed
//       localStorage.setItem("orderDetails", JSON.stringify(data));

//       // Navigate to the respective page based on ordertype
//       switch (ordertype) {
//         case "Invoice":
//           navigate('/editinvoice/${id}', { state: data });
//           break;
//         case "Estimate":
//           navigate('/editestimate/${id}', { state: data });
//           break;
//         case "Expense":
//           navigate('/editexpense/${id}', { state: data });
//           break;
//         case "ReceiptPayment":
//           navigate('/editreceiptpayment/${id}', { state: data });
//           break;
//           // case "Shipment":
//           // navigate(/shipmentform/${id}, { state: data });
//           // break;
//         default:
//           console.error("Unknown ordertype");
//       }
//     } catch (err) {
//       console.error("Error fetching details:", err.message);
//     }
//   };


// const handleActionSelect = async (id, action, ordertype, customerName) => {
//     if (action === "convertToInvoice" && ordertype === "Estimate") {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/estimates/getestimatewitheproductsbyid",
//           { id }
//         );
//         navigate(`/invoiceform/${id}`, { state: response.data });
//       } catch (error) {
//         console.error("Error converting estimate to invoice:", error.message);
//       }
//     } else if (action === "edit") {
//       handleEdit(ordertype, id);
//     } else if (action === "delete") {
//       handleDelete(id);
//     } else if (action === "RecieptPayment") {
//       localStorage.setItem("selectedInvoiceId", id);
//       localStorage.setItem("selectedCustomerName", customerName);
//       localStorage.setItem("selectedOrderType", "ReceiptPayment");
//       navigate("/receiptform", { state: { id, customerName } });
//     } else if (action === "ExpenseForm") {
//       localStorage.setItem("selectedInvoiceId", id);
//       localStorage.setItem("selectedCustomerName", customerName);
//       localStorage.setItem("selectedOrderType", "Expense");
//       navigate("/expenseform", { state: { id, customerName } });
//     } else if (action === "Shipment") {
//       navigate(`/shipmentform/${id}, { state: { id, customerName } }`);
//     }
//     if (action === "Paymentbalance") {
//       localStorage.setItem("selectedInvoiceId", id);
//       localStorage.setItem("selectedCustomerName", customerName);
//       // Navigate to the PaymentBalance form
//       navigate("/paymentbalance", { state: { id, customerName } });
//     }
//     if (action === "Showrecieptpaymentslist") {
//       localStorage.setItem("selectedInvoiceId", id); // Set the invoice ID in localStorage
//       localStorage.setItem("selectedCustomerName", customerName);
//       navigate(`/showrecieptpaymentslist, { state: { id, customerName } }`); // Navigate to receipt payments page
//     }
//     if (action === "Send") {
//       localStorage.setItem("selectedInvoiceId", id); // Set the invoice ID in localStorage
//       localStorage.setItem("selectedCustomerName", customerName);
//       localStorage.setItem("selectedOrderType", "Invoice");
//       // navigate(/sendemailpage, { state: { id, customerName} }); // Navigate to receipt payments page
//       navigate(`/sendemailpage, { state: { ordertype: "Invoice", id, customerName } }`);

//     }
//   };
  
//   // Handle invoice deletion
//   const handleDelete = async (invoiceId) => {
//     try {
//       await axios.post("http://localhost:8080/invoices/deleteinvoice", {
//         id: invoiceId,
//       });
//       setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
//     } catch (err) {
//       console.error("Failed to delete invoice:", err.message);
//     }
//   };


//   // Pagination
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentInvoices = filteredInvoices.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );
//   const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Invoice List</h2>

//       <div style={{ marginBottom: "10px" }}>
//         <label>Filter by date range: </label>
//         <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
//           <option value="all">All</option>
//           <option value="thisWeek">This Week</option>
//           <option value="thisMonth">This Month</option>
//           <option value="lastMonth">Last Month</option>
//           <option value="thisQuarter">This Quarter</option>
//           <option value="thisYear">This Year</option>
//           <option value="lastYear">Last Year</option>
//         </select>
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <label>Filter by status: </label>
//         <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//           <option value="all">All</option>
//           <option value="1">Schedule is Pending</option>
//           <option value="2">Partial Products are Shipped</option>
//           <option value="3">All Products are Shipped</option>
//           <option value="4">Work Completed Payment Pending</option>
//           <option value="5">Partial Work Completed</option>
//         </select>
//       </div>

//       <table border="1" cellPadding="10" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Customer Name</th>
//             <th>Order Type</th>
//             <th>Created Date</th>
//             <th>Status</th>
//             <th>Franchise Owner</th>
//             <th>Balance Amount</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentInvoices.length > 0 ? (
//             currentInvoices.map((invoice) => (
//               <tr key={invoice.id}>
//                 <td>{invoice.id}</td>
//                 <td>{invoice.customerdisplayname_id}</td>
//                 <td>{invoice.ordertype}</td>
//                 <td>{invoice.createddate}</td>
//                 <td>{invoice.status_id}</td>
//                 <td>{invoice.franchiseowner_id}</td>
//                 <td>{invoice.balanceamount}</td>
//                 <td>
//                   <select
//                     onChange={(e) =>
//                       handleActionSelect(
//                         invoice.id,
//                         e.target.value,
//                         invoice.ordertype,
//                         invoice.customerdisplayname_id
//                       )
//                     }
//                   >
//                     <option value="">Select Action</option>
//                     <option value="edit">Edit</option>
//                     <option value="delete">Delete</option>
//                     {invoice.ordertype === "Estimate" && (
//                       <option value="convertToInvoice">Convert to Invoice</option>
//                     )}
//                     {invoice.ordertype === "Invoice" && (
//                       <>
//                         <option value="RecieptPayment">Receipt Payment</option>
//                         <option value="ExpenseForm">Expense Form</option>
//                         <option value="Shipment">Shipment</option>
//                         <option value="Paymentbalance">Paymentbalance</option>
//                         <option value="Showrecieptpaymentslist">Showrecieptpaymentlist</option>
//                         <option value="Send">Send</option>
//                       </>
//                     )}
//                   </select>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8">No invoices found for {customerdisplayname}</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {totalPages > 1 && (
//         <div style={{ marginTop: "20px", textAlign: "center" }}>
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span style={{ margin: "0 10px" }}>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerInvoices;





import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './CustomerInvoices.css';

const CustomerInvoices = ({isOpen}) => {
  const { customerdisplayname } = useParams();
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const itemsPerPage = 4;
  const navigate = useNavigate();

  // Fetch invoices on component mount
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/invoices/Displaylistofinvoicesparticularfields"
        );
        const sortedInvoices = response.data.sort(
          (a, b) => new Date(b.createddate) - new Date(a.createddate)
        );
        setInvoices(sortedInvoices);
        setFilteredInvoices(sortedInvoices);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [customerdisplayname]);

  // Apply filters (date range and status)
  const applyFilters = useCallback(() => {
    const now = new Date();
    const filtered = invoices.filter((invoice) => {
      const createdDate = new Date(invoice.createddate);

      const dateFilterPass = (() => {
        switch (dateFilter) {
          case "thisWeek":
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            return createdDate >= startOfWeek;
          case "thisMonth":
            return (
              createdDate.getMonth() === now.getMonth() &&
              createdDate.getFullYear() === now.getFullYear()
            );
          case "lastMonth":
            const lastMonth = new Date(now);
            lastMonth.setMonth(now.getMonth() - 1);
            return (
              createdDate.getMonth() === lastMonth.getMonth() &&
              createdDate.getFullYear() === lastMonth.getFullYear()
            );
          case "thisQuarter":
            const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
            const quarterStartDate = new Date(now.getFullYear(), quarterStartMonth, 1);
            return createdDate >= quarterStartDate;
          case "thisYear":
            return createdDate.getFullYear() === now.getFullYear();
          case "lastYear":
            return createdDate.getFullYear() === now.getFullYear() - 1;
          default:
            return true;
        }
      })();

      const statusFilterPass =
        statusFilter === "all" || invoice.status_id === statusFilter;

      return dateFilterPass && statusFilterPass;
    });

    setFilteredInvoices(filtered);
    setCurrentPage(1);
  }, [invoices, dateFilter, statusFilter]);

  // Re-apply filters whenever the filter states change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);


    // Handle edit action
  const handleEdit = async (ordertype, id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/ordersinvoiceestimate/basedonordertype",
        { ordertype, id }
      );

      const data = response.data;

      // Store fetched details in local storage or state as needed
      localStorage.setItem("orderDetails", JSON.stringify(data));

      // Navigate to the respective page based on ordertype
      switch (ordertype) {
        case "Invoice":
          navigate('/editinvoice/${id}', { state: data });
          break;
        case "Estimate":
          navigate('/editestimate/${id}', { state: data });
          break;
        case "Expense":
          navigate('/editexpense/${id}', { state: data });
          break;
        case "ReceiptPayment":
          navigate('/editreceiptpayment/${id}', { state: data });
          break;
          // case "Shipment":
          // navigate(/shipmentform/${id}, { state: data });
          // break;
        default:
          console.error("Unknown ordertype");
      }
    } catch (err) {
      console.error("Error fetching details:", err.message);
    }
  };


const handleActionSelect = async (id, action, ordertype, customerName) => {
    if (action === "convertToInvoice" && ordertype === "Estimate") {
      try {
        const response = await axios.post(
          "http://localhost:8080/estimates/getestimatewitheproductsbyid",
          { id }
        );
        navigate(`/invoiceform/${id}`, { state: response.data });
      } catch (error) {
        console.error("Error converting estimate to invoice:", error.message);
      }
    } else if (action === "edit") {
      handleEdit(ordertype, id);
    } else if (action === "delete") {
      handleDelete(id);
    } else if (action === "RecieptPayment") {
      localStorage.setItem("selectedInvoiceId", id);
      localStorage.setItem("selectedCustomerName", customerName);
      localStorage.setItem("selectedOrderType", "ReceiptPayment");
      navigate("/receiptform", { state: { id, customerName } });
    } else if (action === "ExpenseForm") {
      localStorage.setItem("selectedInvoiceId", id);
      localStorage.setItem("selectedCustomerName", customerName);
      localStorage.setItem("selectedOrderType", "Expense");
      navigate("/expenseform", { state: { id, customerName } });
    } else if (action === "Shipment") {
      navigate(`/shipmentform/${id}, { state: { id, customerName } }`);
    }
    if (action === "Paymentbalance") {
      localStorage.setItem("selectedInvoiceId", id);
      localStorage.setItem("selectedCustomerName", customerName);
      // Navigate to the PaymentBalance form
      navigate("/paymentbalance", { state: { id, customerName } });
    }
    if (action === "Showrecieptpaymentslist") {
      localStorage.setItem("selectedInvoiceId", id); // Set the invoice ID in localStorage
      localStorage.setItem("selectedCustomerName", customerName);
      navigate(`/showrecieptpaymentslist, { state: { id, customerName } }`); // Navigate to receipt payments page
    }
    if (action === "Send") {
      localStorage.setItem("selectedInvoiceId", id); // Set the invoice ID in localStorage
      localStorage.setItem("selectedCustomerName", customerName);
      localStorage.setItem("selectedOrderType", "Invoice");
      // navigate(/sendemailpage, { state: { id, customerName} }); // Navigate to receipt payments page
      navigate(`/sendemailpage, { state: { ordertype: "Invoice", id, customerName } }`);

    }
  };
  
  // Handle invoice deletion
  const handleDelete = async (invoiceId) => {
    try {
      await axios.post("http://localhost:8080/invoices/deleteinvoice", {
        id: invoiceId,
      });
      setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
    } catch (err) {
      console.error("Failed to delete invoice:", err.message);
    }
  };


  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`customer-invoice-list ${isOpen ? 'open' : ''}`}>
      <h2>Invoice List</h2>

      <div className="customer-invoice-list-div">
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

      <div className="customer-invoice-list-div">
        <label>Filter by status: </label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="1">Schedule is Pending</option>
          <option value="2">Partial Products are Shipped</option>
          <option value="3">All Products are Shipped</option>
          <option value="4">Work Completed Payment Pending</option>
          <option value="5">Partial Work Completed</option>
        </select>
      </div>

      <table className="customer-invoice-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Order Type</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Franchise Owner</th>
            <th>Balance Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentInvoices.length > 0 ? (
            currentInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.customerdisplayname_id}</td>
                <td>{invoice.ordertype}</td>
                <td>{invoice.createddate}</td>
                <td>{invoice.status_id}</td>
                <td>{invoice.franchiseowner_id}</td>
                <td>{invoice.balanceamount}</td>
                <td>
                  <select
                    onChange={(e) =>
                      handleActionSelect(
                        invoice.id,
                        e.target.value,
                        invoice.ordertype,
                        invoice.customerdisplayname_id
                      )
                    }
                  >
                    <option value="">Select Action</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    {invoice.ordertype === "Estimate" && (
                      <option value="convertToInvoice">Convert to Invoice</option>
                    )}
                    {invoice.ordertype === "Invoice" && (
                      <>
                        <option value="RecieptPayment">Receipt Payment</option>
                        <option value="ExpenseForm">Expense Form</option>
                        <option value="Shipment">Shipment</option>
                        <option value="Paymentbalance">Paymentbalance</option>
                        <option value="Showrecieptpaymentslist">Showrecieptpaymentlist</option>
                        <option value="Send">Send</option>
                      </>
                    )}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No invoices found for {customerdisplayname}</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="customer-invoice-list-div-button">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerInvoices;