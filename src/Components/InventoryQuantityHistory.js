import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryQuantityHistory.css';

const InventoryQuantityHistory = ({isOpen}) => {
  const [inventoryHistory, setInventoryHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventoryHistory = async () => {
      try {
        const response = await axios.post('http://localhost:8080/inventoryquantities/getInventoryQuantities');
        setInventoryHistory(response.data);
      } catch (err) {
        setError('Error fetching inventory history.');
        console.error('Error:', err);
      }
    };

    fetchInventoryHistory();
  }, []);

  return (
    <div className={`inventory-quantity-history ${isOpen ? 'open' : ''}`}>
      <h2>Inventory Quantity History</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {inventoryHistory.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Added  Quantity</th>
              <th>Updateddate</th>
              <th>Updatedby</th>
            </tr>
          </thead>
          <tbody>
            {inventoryHistory.map((item) => (
              <tr key={item.productid}>
                
                <td>{item.productid}</td>
                <td>{item.productname}</td>
                <td>{item.addedquantity}</td>
                <td>{item.createddate}</td>
                <td>{item.createdby}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='inventory-quantity-history-div'>Loading inventory history...</div>
      )}
    </div>
  );
};

export default InventoryQuantityHistory;
