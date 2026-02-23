// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './CustomerInvoiceList.css';

// const CustomerList = ({isOpen}) => {
//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const customersPerPage = 20;
//   const navigate = useNavigate();

//   const username = localStorage.getItem('username');

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const customerResponse = await axios.post(
//           'http://localhost:8080/customers/displayallcustomerslistfewfields'
//         );

//         const recentNotesResponse = await axios.post(
//           'http://localhost:8080/notes/recent'
//         );

//         const notesData = recentNotesResponse.data;

//         const enrichedCustomers = customerResponse.data.map((customer) => {
//           const note = notesData.find((note) => note.customerId === customer.id);
//           return {
//             ...customer,
//             customerDisplayName: customer.customerdisplayname || 'Unnamed Customer',
//             createdDate: note ? note.createdDate : 'N/A',
//             customerStatus: note ? note.customerStatus : 'Unknown',
//           };
//         });

//         const sortedCustomers = enrichedCustomers.sort((a, b) =>
//           a.customerDisplayName.localeCompare(b.customerDisplayName)
//         );

//         setCustomers(sortedCustomers);
//         setFilteredCustomers(sortedCustomers);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchCustomerData();
//   }, [username]);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query === '') {
//       setFilteredCustomers(customers);
//     } else {
//       const filtered = customers.filter((customer) =>
//         customer.customerDisplayName.toLowerCase().startsWith(query)
//       );
//       setFilteredCustomers(filtered);
//     }
//     setCurrentPage(1);
//   };

//   const handleAction = async (action, customerId, customerDisplayName) => {
//     switch (action) {
//       case 'edit':
//         navigate(`/editcustomer/${customerId}`);
//         break;
//       case 'delete':
//         if (window.confirm(`Are you sure you want to delete customer ${customerDisplayName}?`)) {
//           try {
//             await axios.post('http://localhost:8080/customers/deletecustomer', { id: customerId });
//             setCustomers(customers.filter((customer) => customer.id !== customerId));
//             setFilteredCustomers(filteredCustomers.filter((customer) => customer.id !== customerId));
//             alert('Customer deleted successfully.');
//           } catch (err) {
//             setError('Error deleting customer: ' + err.message);
//           }
//         }
//         break;
//       case 'createInvoice':
//         try {
//           const response = await axios.post(
//             'http://localhost:8080/customers/particularcustomerdetails',
//             { customerDisplayName, createdby: username }
//           );
//           const customerData = response.data;
//           customerData.ordertype = 'Invoice';
//           navigate('/invoiceform', { state: customerData });
//         } catch (err) {
//           setError('Error fetching customer data: ' + err.message);
//         }
//         break;
//       case 'createEstimate':
//         try {
//           const response = await axios.post(
//             'http://localhost:8080/customers/particularcustomerdetails',
//             { customerDisplayName, createdby: username }
//           );
//           const customerData = response.data;
//           customerData.ordertype = 'Estimate';
//           navigate('/estimateform', { state: customerData });
//         } catch (err) {
//           setError('Error fetching customer data: ' + err.message);
//         }
//         break;
//       case 'showTransactions':
//         navigate(`/customerinvoices/${customerDisplayName}`);
//         break;
//       case 'addnotes':
//         const selectedCustomer = customers.find((c) => c.customerdisplayname === customerDisplayName);
//         navigate('/notesform', {
//           state: {
//             customerDisplayName: customerDisplayName,
//             mobileNumber: selectedCustomer?.mobilenumber,
//             recentCustomerStatus: selectedCustomer?.customerStatus || "Unknown",
//           },
//         });
//         break;
//       case 'shownotes':
//         navigate('/shownotesform', {
//           state: { customerId },
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   const handleCustomerClick = (customerDisplayName) => {
//     navigate(`/customerinvoices/${customerDisplayName}`);
//   };

//   const indexOfLastCustomer = currentPage * customersPerPage;
//   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
//   const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

//   const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className={`customer-invoice-list-container ${isOpen ? 'open' : ''}`}>
//       <h2>Customers List</h2>

//       <div className='customer-invoice-list-name'>
//         <label htmlFor="search">Search by Name: </label>
//         <input
//           id="search"
//           type="text"
//           placeholder="Enter a name..."
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       <table className='customer-invoice-list-table'>
//         <thead>
//           <tr>
//             <th>Customer Name</th>
//             <th>Mobile Number</th>
//             <th>Created Date</th>
//             <th>Customer Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentCustomers.length > 0 ? (
//             currentCustomers.map((customer) => (
//               <tr key={customer.id}>
//                 <td
//                   style={{ cursor: 'pointer' }}
//                   onClick={() => handleCustomerClick(customer.customerdisplayname)}
//                 >
//                   {customer.customerdisplayname}
//                 </td>
//                 <td>{customer.mobilenumber}</td>
//                 <td>{customer.createddate}</td>
//                 <td>{customer.customerStatus}</td>
//                 <td>
//                   <select
//                     onChange={(e) =>
//                       handleAction(e.target.value, customer.id, customer.customerdisplayname)
//                     }
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select Action
//                     </option>
//                     <option value="edit">Edit</option>
//                     <option value="delete">Delete</option>
//                     <option value="createInvoice">Create Invoice</option>
//                     <option value="createEstimate">Create Estimate</option>
//                     <option value="showTransactions">Show Transactions</option>
//                     <option value="addnotes">Add Notes</option>
//                     <option value="shownotes">Show Notes</option>
//                   </select>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No customers found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className='customer-invoice-list-pevious'>
//         <button onClick={handlePrevPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span style={{ margin: '0 10px' }}>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomerList;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './CustomerInvoiceList.css';

// /* =========================================
//    Portfolio → Actions Mapping (FINAL)
// ========================================= */
// const portfolioActionMap = {
//   AV: [
//     'delete',
//     'createInvoice',
//     'createEstimate',
//     'showTransactions',
//     'addnotes',
//     'shownotes',
//   ],

//   Mobile: ['ALL', 'New Line', 'Notes', 'Payment'],

//   Internet: ['ALL', 'Add New Line', 'Notes', 'Payments'],

//   'Tenant Improvement': [
//     'ALL',
//     'Project Estimate',
//     'Project Invoice',
//     'Payments',
//     'Expense Report',
//   ],

//   'Commercial HVAC TI': [
//     'ALL',
//     'Project Estimate',
//     'Project Invoice',
//     'Payments',
//     'Expense Report',
//   ],

//   'Commercial Electrical': [
//     'ALL',
//     'Project Estimate',
//     'Project Invoice',
//     'Payments',
//     'Expense Report',
//   ],

//   'Residential HVAC': [
//     'ALL',
//     'Project Estimate',
//     'Project Invoice',
//     'Payments',
//     'Expense Report',
//   ],

//   'Residential Electrical': [
//     'ALL',
//     'Project Estimate',
//     'Project Invoice',
//     'Payments',
//     'Expense Report',
//   ],

//   /* -------- Service Portfolios -------- */
//   'Commercial HVAC Service': [
//     'ALL',
//     'New Service Request',
//     'Payments',
//   ],

//   'Commercial Electrical Service': [
//     'ALL',
//     'New Service Request',
//     'Payments',
//   ],

//   'Residential HVAC Service': [
//     'ALL',
//     'New Service Request',
//     'Payments',
//   ],

//   'Residential Electrical Service': [
//     'ALL',
//     'New Service Request',
//     'Payments',
//   ],
// };

// const CustomerList = ({ isOpen }) => {
//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [portfolioSelections, setPortfolioSelections] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   const customersPerPage = 20;
//   const navigate = useNavigate();

//   /* ===============================
//      Fetch Customers
// ================================ */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.post(
//           'http://localhost:8080/customers/displayallcustomerslistfewfields'
//         );
//         setCustomers(res.data);
//         setFilteredCustomers(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   /* ===============================
//      Search
// ================================ */
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     setFilteredCustomers(
//       customers.filter((c) =>
//         c.customerdisplayname.toLowerCase().startsWith(query)
//       )
//     );
//     setCurrentPage(1);
//   };

//   /* ===============================
//      Portfolio Change
// ================================ */
//   const handlePortfolioChange = (customerId, value) => {
//     setPortfolioSelections((prev) => ({
//       ...prev,
//       [customerId]: value,
//     }));
//   };

//   /* ===============================
//      Action Handler
// ================================ */
//   const handleAction = (action, customer) => {
//     switch (action) {
//       case 'delete':
//         navigate(`/editcustomer/${customer.id}`);
//         break;

//       case 'createInvoice':
//         navigate('/invoiceform', {
//           state: { customerDisplayName: customer.customerdisplayname },
//         });
//         break;

//       case 'createEstimate':
//         navigate('/estimateform', {
//           state: { customerDisplayName: customer.customerdisplayname },
//         });
//         break;

//       case 'showTransactions':
//         navigate(`/customerinvoices/${customer.customerdisplayname}`);
//         break;

//       case 'addnotes':
//         navigate('/notesform', {
//           state: { customerDisplayName: customer.customerdisplayname },
//         });
//         break;

//       case 'shownotes':
//         navigate('/shownotesform', {
//           state: { customerId: customer.id },
//         });
//         break;

//       default:
//         alert(`Action "${action}" selected`);
//     }
//   };

//   /* ===============================
//      Pagination
// ================================ */
//   const indexOfLast = currentPage * customersPerPage;
//   const indexOfFirst = indexOfLast - customersPerPage;
//   const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   /* ===============================
//      JSX
// ================================ */
//   return (
//     <div className={`customer-invoice-list-container ${isOpen ? 'open' : ''}`}>
//       <h2>Customers List</h2>

//       <div className="customer-invoice-list-name">
//         <label>Search by Name:</label>
//         <input value={searchQuery} onChange={handleSearch} />
//       </div>

//       <table className="customer-invoice-list-table">
//         <thead>
//           <tr>
//             <th>Customer Name</th>
//             <th>Mobile</th>
//             <th>Portfolio</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {currentCustomers.map((customer) => {
//             const actions =
//               portfolioActionMap[portfolioSelections[customer.id]] || [];

//             return (
//               <tr key={customer.id}>
//                 <td>{customer.customerdisplayname}</td>
//                 <td>{customer.mobilenumber}</td>

//                 <td>
//                   <select
//                     value={portfolioSelections[customer.id] || ''}
//                     onChange={(e) =>
//                       handlePortfolioChange(customer.id, e.target.value)
//                     }
//                   >
//                     <option value="" disabled>
//                       Select Portfolio
//                     </option>
//                     {Object.keys(portfolioActionMap).map((p) => (
//                       <option key={p} value={p}>
//                         {p}
//                       </option>
//                     ))}
//                   </select>
//                 </td>

//                 <td>
//                   <select
//                     defaultValue=""
//                     onChange={(e) =>
//                       handleAction(e.target.value, customer)
//                     }
//                     disabled={!portfolioSelections[customer.id]}
//                   >
//                     <option value="" disabled>
//                       Select Action
//                     </option>

//                     {actions.map((action) => (
//                       <option key={action} value={action}>
//                         {action}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <div className="customer-invoice-list-pevious">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomerList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CustomerInvoiceList.css';

/* =========================================
   Portfolio → Actions Mapping (FINAL)
========================================= */
const portfolioActionMap = {
  AV: [
    'delete',
    'createInvoice',
    'createEstimate',
    'showTransactions',
    'addnotes',
    'shownotes',
  ],

  Mobile: ['ALL', 'New Line', 'Notes', 'Payment'],

  Internet: ['ALL', 'Add New Line', 'Notes', 'Payments'],

  'Tenant Improvement': [
    'ALL',
    'Project Estimate',
    'Project Invoice',
    'Payments',
    'Expense Report',
  ],

  'Commercial HVAC TI': [
    'ALL',
    'Project Estimate',
    'Project Invoice',
    'Payments',
    'Expense Report',
  ],

  'Commercial Electrical': [
    'ALL',
    'Project Estimate',
    'Project Invoice',
    'Payments',
    'Expense Report',
  ],

  'Residential HVAC': [
    'ALL',
    'Project Estimate',
    'Project Invoice',
    'Payments',
    'Expense Report',
  ],

  'Residential Electrical': [
    'ALL',
    'Project Estimate',
    'Project Invoice',
    'Payments',
    'Expense Report',
  ],

  /* -------- Service Portfolios -------- */
  'Commercial HVAC Service': [
    'ALL',
    'New Service Request',
    'Payments',
  ],

  'Commercial Electrical Service': [
    'ALL',
    'New Service Request',
    'Payments',
  ],

  'Residential HVAC Service': [
    'ALL',
    'New Service Request',
    'Payments',
  ],

  'Residential Electrical Service': [
    'ALL',
    'New Service Request',
    'Payments',
  ],
};

const CustomerList = ({ isOpen }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [portfolioSelections, setPortfolioSelections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 20;
  const navigate = useNavigate();

  /* ===============================
     Fetch Customers
================================ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/customers/displayallcustomerslistfewfields'
        );
        setCustomers(res.data);
        setFilteredCustomers(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ===============================
     Search
================================ */
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCustomers(
      customers.filter((c) =>
        c.customerdisplayname.toLowerCase().startsWith(query)
      )
    );
    setCurrentPage(1);
  };

  /* ===============================
     Portfolio Change
================================ */
  const handlePortfolioChange = (customerId, value) => {
    setPortfolioSelections((prev) => ({
      ...prev,
      [customerId]: value,
    }));
  };

  /* ===============================
     Action Handler
================================ */
  const handleAction = (action, customer) => {
    switch (action) {
      case 'delete':
        navigate(`/editcustomer/${customer.id}`);
        break;

      case 'createInvoice':
        navigate('/invoiceform', {
          state: { customerDisplayName: customer.customerdisplayname },
        });
        break;

      case 'createEstimate':
        navigate('/estimateform', {
          state: { customerDisplayName: customer.customerdisplayname },
        });
        break;

      case 'showTransactions':
        navigate(`/customerinvoices/${customer.customerdisplayname}`);
        break;

      case 'addnotes':
        navigate('/notesform', {
          state: { customerDisplayName: customer.customerdisplayname },
        });
        break;

      case 'shownotes':
        navigate('/shownotesform', {
          state: { customerId: customer.id },
        });
        break;

      /* ===============================
         Tenant Improvement Navigation
      ================================ */
      case 'Project Estimate':
        navigate('/tenantestimate', {
          state: { customerId: customer.id },
        });
        break;

      case 'Project Invoice':
        navigate('/tenantinvoice', {
          state: { customerId: customer.id },
        });
        break;

      default:
        alert(`Action "${action}" selected`);
    }
  };

  /* ===============================
     Pagination
================================ */
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  /* ===============================
     JSX
================================ */
  return (
    <div
      className={`customer-invoice-list-container ${
        isOpen ? 'open' : ''
      }`}
    >
      <h2>Customers List</h2>

      <div className="customer-invoice-list-name">
        <label>Search by Name:</label>
        <input value={searchQuery} onChange={handleSearch} />
      </div>

      <table className="customer-invoice-list-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Mobile</th>
            <th>Portfolio</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentCustomers.map((customer) => {
            const actions =
              portfolioActionMap[
                portfolioSelections[customer.id]
              ] || [];

            return (
              <tr key={customer.id}>
                <td>{customer.customerdisplayname}</td>
                <td>{customer.mobilenumber}</td>

                <td>
                  <select
                    value={portfolioSelections[customer.id] || ''}
                    onChange={(e) =>
                      handlePortfolioChange(
                        customer.id,
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      Select Portfolio
                    </option>
                    {Object.keys(portfolioActionMap).map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <select
                    defaultValue=""
                    onChange={(e) =>
                      handleAction(e.target.value, customer)
                    }
                    disabled={!portfolioSelections[customer.id]}
                  >
                    <option value="" disabled>
                      Select Action
                    </option>
                    {actions.map((action) => (
                      <option key={action} value={action}>
                        {action}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="customer-invoice-list-pevious">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
