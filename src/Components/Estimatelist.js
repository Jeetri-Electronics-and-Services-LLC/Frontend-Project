// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const EstimateList = () => {
//   const [estimates, setEstimates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEstimateData = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/estimates/displaylistofestimateparticularfields"
//         );
//         setEstimates(response.data);
//       } catch (err) {
//         setError("Error fetching estimates: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEstimateData();
//   }, []);

//   const handleEdit = async (ordertype, id) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/estimates/getestimatewitheproductsbyid",
//         { ordertype, id }
//       );

//       const data = response.data;
//       localStorage.setItem("orderDetails", JSON.stringify(data));

//       const routes = {
//         Invoice: `/editinvoice/${id}`,
//         Estimate: `/editestimate/${id}`,
//         Expense: `/editexpense/${id}`,
//         ReceiptPayment: `/editreceiptpayment/${id}`,
//         Shipment: `/shipmentform/${id}`,
//       };

//       if (routes[ordertype]) {
//         navigate(routes[ordertype], { state: data });
//       } else {
//         console.error("Unknown ordertype:", ordertype);
//       }
//     } catch (err) {
//       console.error("Error fetching details:", err.message);
//     }
//   };

//   const handleActionSelect = async (id, action, ordertype, customerdisplayname) => {
//     switch (action) {
//       case "edit":
//         handleEdit(ordertype, id);
//         break;
//       case "delete":
//         if (window.confirm(`Are you sure you want to delete ${ordertype} ${id}?`)) {
//           try {
//             await axios.post("http://localhost:8080/orders/delete", { id });
//             setEstimates(estimates.filter((est) => est.id !== id));
//             alert(`${ordertype} deleted successfully.`);
//           } catch (err) {
//             setError(`Error deleting ${ordertype}: ` + err.message);
//           }
//         }
//         break;
//       case "convertToInvoice":
//         if (ordertype === "Estimate") {
//           try {
//             const response = await axios.post(
//               "http://localhost:8080/estimates/getestimatewitheproductsbyid",
//               { id }
//             );
//             navigate(`/invoiceform/${id}`, { state: response.data });
//           } catch (err) {
//             setError("Error converting estimate to invoice: " + err.message);
//           }
//         }
//         break;
//       case "ReceiptPayment":
//         localStorage.setItem("selectedInvoiceId", id);
//         localStorage.setItem("selectedCustomerName", customerdisplayname);
//         localStorage.setItem("selectedOrderType", "ReceiptPayment");
//         navigate("/receiptform");
//         break;
//       case "ExpenseForm":
//         localStorage.setItem("selectedInvoiceId", id);
//         localStorage.setItem("selectedCustomerName", customerdisplayname);
//         localStorage.setItem("selectedOrderType", "Expense");
//         navigate("/expenseform");
//         break;
//       case "Shipment":
//         navigate(`/shipmentform/${id}`);
//         break;
//       default:
//         console.error("Unknown action:", action);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="estimate-list-container">
//       <h2>Estimate List</h2>
//       <table className="estimate-list-table">
//         <thead>
//           <tr>
//             <th>Estimate ID</th>
//             <th>Customer Name</th>
//             <th>Created Date</th>
//             <th>Franchise Owner</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {estimates.length > 0 ? (
//             estimates.map((estimate) => (
//               <tr key={estimate.id}>
//                 <td>{estimate.id}</td>
//                 <td>{estimate.customerdisplayname_id}</td>
//                 <td>{estimate.createddate}</td>
//                 <td>{estimate.franchiseowner_id}</td>
//                 <td>
//                   <select
//                     onChange={(e) =>
//                       handleActionSelect(
//                         estimate.id,
//                         e.target.value,
//                         "Estimate",
//                         estimate.customerdisplayname_id
//                       )
//                     }
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select Action
//                     </option>
//                     <option value="showEstimate">Show Estimate</option>
//                     <option value="edit">Edit</option>
//                     <option value="delete">Delete</option>
//                     <option value="copy">Copy</option>
//                     <option value="send">Send</option>
//                     <option value="convertToInvoice">Convert to Invoice</option>
//                   </select>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No estimates found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EstimateList;








import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Estimatelist.css';

const EstimateList = ({isOpen}) => {
  const [estimates, setEstimates] = useState([]);
  const [filteredEstimates, setFilteredEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstimateData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/estimates/displaylistofestimateparticularfields"
        );
        setEstimates(response.data);
        setFilteredEstimates(response.data);
      } catch (err) {
        setError("Error fetching estimates: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimateData();
  }, []);


    const handleEdit = async (ordertype, id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/estimates/getestimatewitheproductsbyid",
        { ordertype, id }
      );

      const data = response.data;
      localStorage.setItem("orderDetails", JSON.stringify(data));

      const routes = {
        Invoice: `/editinvoice/${id}`,
        Estimate: `/editestimate/${id}`,
        Expense: `/editexpense/${id}`,
        ReceiptPayment: `/editreceiptpayment/${id}`,
        Shipment: `/shipmentform/${id}`,
      };

      if (routes[ordertype]) {
        navigate(routes[ordertype], { state: data });
      } else {
        console.error("Unknown ordertype:", ordertype);
      }
    } catch (err) {
      console.error("Error fetching details:", err.message);
    }
  };



  // Apply filters
  useEffect(() => {
    let filtered = estimates;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((estimate) => estimate.status_id === statusFilter);
    }

    // Filter by date range
    const now = new Date();
    filtered = filtered.filter((estimate) => {
      const createdDate = new Date(estimate.createddate);
      switch (dateRangeFilter) {
        case "thisWeek":
          const startOfWeek = new Date();
          startOfWeek.setDate(now.getDate() - now.getDay());
          return createdDate >= startOfWeek;
        case "thisMonth":
          return (
            createdDate.getMonth() === now.getMonth() &&
            createdDate.getFullYear() === now.getFullYear()
          );
        case "lastMonth":
          const lastMonth = new Date();
          lastMonth.setMonth(now.getMonth() - 1);
          return (
            createdDate.getMonth() === lastMonth.getMonth() &&
            createdDate.getFullYear() === lastMonth.getFullYear()
          );
        case "thisQuarter":
          const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
          const startOfQuarter = new Date(now.getFullYear(), quarterStartMonth, 1);
          return createdDate >= startOfQuarter;
        case "thisYear":
          return createdDate.getFullYear() === now.getFullYear();
        case "lastYear":
          return createdDate.getFullYear() === now.getFullYear() - 1;
        default:
          return true;
      }
    });

    setFilteredEstimates(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [statusFilter, dateRangeFilter, estimates]);

  const handleActionSelect = async (id, action, ordertype, customerdisplayname) => {
    switch (action) {
      case "edit":
        handleEdit(ordertype, id);
        break;
      case "delete":
        if (window.confirm(`Are you sure you want to delete ${ordertype} ${id}?`)) {
          try {
            await axios.post("http://localhost:8080/orders/delete", { id });
            setEstimates(estimates.filter((est) => est.id !== id));
            alert(`${ordertype} deleted successfully.`);
          } catch (err) {
            setError(`Error deleting ${ordertype}: ` + err.message);
          }
        }
        break;
      case "convertToInvoice":
        if (ordertype === "Estimate") {
          try {
            const response = await axios.post(
              "http://localhost:8080/estimates/getestimatewitheproductsbyid",
              { id }
            );
            const estimateData = response.data;
            estimateData.status_id = "Customer Accepted Order"; // Set default status
            navigate(`/invoiceform/${id}`, { state: estimateData });
          } catch (err) {
            setError("Error converting estimate to invoice: " + err.message);
          }
        }
        break;
      case "ReceiptPayment":
        localStorage.setItem("selectedInvoiceId", id);
        localStorage.setItem("selectedCustomerName", customerdisplayname);
        localStorage.setItem("selectedOrderType", "ReceiptPayment");
        navigate("/receiptform");
        break;
      case "ExpenseForm":
        localStorage.setItem("selectedInvoiceId", id);
        localStorage.setItem("selectedCustomerName", customerdisplayname);
        localStorage.setItem("selectedOrderType", "Expense");
        navigate("/expenseform");
        break;
      case "Shipment":
        navigate(`/shipmentform/${id}`);
        break;
      default:
        console.error("Unknown action:", action);
    }
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEstimates = filteredEstimates.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredEstimates.length / itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`estimate-list-container ${isOpen ? 'open' : ''}`}>
      <h2>Estimate List</h2>

      {/* Status Filter */}
      <label>Status Filter: </label>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="1">Estimate Created</option>
        <option value="2">Estimate Sent</option>
        <option value="3">Price Negotiation</option>
        <option value="4">Waiting For Confirmation</option>
        <option value="5">Accepted By Customer</option>
      </select>

      {/* Date Range Filter */}
      <label>Date Range: </label>
      <select value={dateRangeFilter} onChange={(e) => setDateRangeFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="thisWeek">This Week</option>
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="thisQuarter">This Quarter</option>
        <option value="thisYear">This Year</option>
        <option value="lastYear">Last Year</option>
      </select>

      <table className="estimate-list-table">
        <thead>
          <tr>
            <th>Estimate ID</th>
            <th>Customer Name</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Franchise Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEstimates.length > 0 ? (
            paginatedEstimates.map((estimate) => (
              <tr key={estimate.id}>
                <td>{estimate.id}</td>
                <td>{estimate.customerdisplayname_id}</td>
                <td>{estimate.createddate}</td>
                <td>{estimate.status_id}</td>
                <td>{estimate.franchiseowner_id}</td>
                <td>
                  <select
                    onChange={(e) =>
                      handleActionSelect(
                        estimate.id,
                        e.target.value,
                        "Estimate",
                        estimate.customerdisplayname_id
                      )
                    }
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Action
                    </option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    <option value="convertToInvoice">Convert to Invoice</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No estimates found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="estimate-list-pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EstimateList;
