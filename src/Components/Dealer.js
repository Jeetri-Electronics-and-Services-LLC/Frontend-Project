import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CustomerInvoiceList.css';

const CustomerList = ({isOpen}) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 20;
  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customerResponse = await axios.post(
          'http://localhost:8080/customers/listofcustomers',
          { createdby: username }
        );

        const recentNotesResponse = await axios.post(
          'http://localhost:8080/notes/recent'
        );

        const notesData = recentNotesResponse.data;

        const enrichedCustomers = customerResponse.data.map((customer) => {
          const note = notesData.find((note) => note.customerId === customer.id);
          return {
            ...customer,
            customerDisplayName: customer.customerDisplayName || 'Unnamed Customer',
            createdDate: note ? note.createdDate : 'N/A',
            customerStatus: note ? note.customerStatus : 'Unknown',
          };
        });

        const sortedCustomers = enrichedCustomers.sort((a, b) =>
          a.customerDisplayName.localeCompare(b.customerDisplayName)
        );

        setCustomers(sortedCustomers);
        setFilteredCustomers(sortedCustomers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [username]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((customer) =>
        customer.customerDisplayName.toLowerCase().startsWith(query)
      );
      setFilteredCustomers(filtered);
    }
    setCurrentPage(1);
  };

  const handleAction = async (action, customerId, customerDisplayName) => {
    switch (action) {
      case 'edit':
        navigate(`/editcustomer/${customerId}`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete customer ${customerId}?`)) {
          try {
            await axios.post('http://localhost:8080/customers/deletecustomer', { id: customerId });
            setCustomers(customers.filter((customer) => customer.id !== customerId));
            setFilteredCustomers(filteredCustomers.filter((customer) => customer.id !== customerId));
            alert('Customer deleted successfully.');
          } catch (err) {
            setError('Error deleting customer: ' + err.message);
          }
        }
        break;
      case 'createInvoice':
        try {
          const response = await axios.post(
            'http://localhost:8080/customers/particularcustomerdetails',
            { customerDisplayName, createdby: username }
          );
          const customerData = response.data;
          customerData.ordertype = 'Invoice';
          navigate('/invoiceform', { state: customerData });
        } catch (err) {
          setError('Error fetching customer data: ' + err.message);
        }
        break;
      case 'createEstimate':
        try {
          const response = await axios.post(
            'http://localhost:8080/customers/particularcustomerdetails',
            { customerDisplayName, createdby: username }
          );
          const customerData = response.data;
          customerData.ordertype = 'Estimate';
          navigate('/estimateform', { state: customerData });
        } catch (err) {
          setError('Error fetching customer data: ' + err.message);
        }
        break;
      case 'showTransactions':
        navigate(`/customerinvoices/${customerDisplayName}`);
        break;
        case 'dealerform':
  navigate('/dealerform', {
    state: {
      customername: customerDisplayName,
    },
  });
  break;

      case 'addnotes':
  const selectedCustomer = customers.find((c) => c.customerDisplayName === customerDisplayName);
  navigate('/notesform', {
    state: {
      customerDisplayName: customerDisplayName,
      mobileNumber: selectedCustomer?.mobileNumber,
      recentCustomerStatus: selectedCustomer?.customerStatus || "Unknown",
    },
  });
  break;

      case 'shownotes':
        navigate('/shownotesform', {
          state: { customerId },
        });
        break;
      default:
        break;
    }
  };

  const handleCustomerClick = (customerDisplayName) => {
    navigate(`/customerinvoices/${customerDisplayName}`);
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`customer-invoice-list-container ${isOpen ? 'open' : ''}`}>
      <h2>Customers List</h2>

      <div className='customer-invoice-list-name'>
        <label htmlFor="search">Search by Name: </label>
        <input
          id="search"
          type="text"
          placeholder="Enter a name..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <table className='customer-invoice-list-table'>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Mobile Number</th>
            <th>Created Date</th>
            <th>Customer Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCustomerClick(customer.customerDisplayName)}
                >
                  {customer.customerDisplayName}
                </td>
                <td>{customer.mobileNumber}</td>
                <td>{customer.createdDate}</td>
                <td>{customer.customerStatus}</td>
                <td>
                  <select
                    onChange={(e) =>
                      handleAction(e.target.value, customer.id, customer.customerDisplayName)
                    }
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Action
                    </option>
                    <option value="dealerform">DealerForm</option>
                    {/*<option value="delete">Delete</option>
                    <option value="createInvoice">Create Invoice</option>
                    <option value="createEstimate">Create Estimate</option>
                    <option value="showTransactions">Show Transactions</option>
                    <option value="addnotes">Add Notes</option>
                    <option value="shownotes">Show Notes</option> */}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='customer-invoice-list-pevious'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
