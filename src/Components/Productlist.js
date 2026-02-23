// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Productlist = () => {
//     const [inventoryItems, setInventoryItems] = useState([]);

//     useEffect(() => {
//         const fetchInventory = async () => {
//             try {
//                 const response = await axios.post('http://localhost:8080/createproducts/inventory');
//                 setInventoryItems(response.data);
//             } catch (error) {
//                 console.error('Error fetching inventory data:', error);
//             }
//         };

//         fetchInventory();
//     }, []);

//     return (
//         <center>
//         <div>
//             <h2>Inventory List</h2>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Product ID</th>
//                         <th>Product Name</th>
//                         <th>Available Quantity</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {inventoryItems.map(item => (
//                         <tr key={item.id}>
//                             <td>{item.id}</td>
//                             <td>{item.name}</td>
//                             <td>{item.quantity}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </center>
//     );
// };

// export default Productlist;




//actiondd
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Productlist = () => {
//     const [inventoryItems, setInventoryItems] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchInventory = async () => {
//             try {
//                 const response = await axios.post('http://localhost:8080/createproducts/inventory');
//                 setInventoryItems(response.data);
//             } catch (error) {
//                 console.error('Error fetching inventory data:', error);
//             }
//         };

//         fetchInventory();
//     }, []);

//     const handleActionChange = (action, itemId) => {
//         if (action === 'InventoryQuantity') {
//             navigate(`/inventoryquantity`);
//         } else if (action === 'InventoryQuantityHistory') {
//             alert(`You selected InventoryQuantityHistory for Product ID: ${itemId}`);
//             // Implement navigation or logic for InventoryQuantityHistory here
//         }
//     };

//     return (
//         <center>
//             <div>
//                 <h2>Inventory List</h2>
//                 <table border="1">
//                     <thead>
//                         <tr>
//                             <th>Product ID</th>
//                             <th>Product Name</th>
//                             <th>Available Quantity</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {inventoryItems.map((item) => (
//                             <tr key={item.id}>
//                                 <td>{item.id}</td>
//                                 <td>{item.name}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>
//                                     <select
//                                         onChange={(e) => handleActionChange(e.target.value, item.id)}
//                                         defaultValue=""
//                                     >
//                                         <option value="" disabled>
//                                             Select Action
//                                         </option>
//                                         <option value="InventoryQuantity">InventoryQuantity</option>
//                                         <option value="InventoryQuantityHistory">
//                                             InventoryQuantityHistory
//                                         </option>
//                                     </select>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </center>
//     );
// };

// export default Productlist;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Productlist.css';

const Productlist = ({isOpen}) => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.post('http://localhost:8080/createproducts/inventory');
                setInventoryItems(response.data);
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchInventory();
    }, []);

    const handleActionChange = (action, product) => {
        if (action === 'InventoryQuantity') {
            navigate('/inventoryquantity', { state: { product } });
        } else if (action === 'InventoryQuantityHistory') {
            alert(`You selected InventoryQuantityHistory for Product ID: ${product.id}`);
        }
    };

    return (

        <div className={`product-list ${isOpen ? 'open' : ''}`}>
            <h2>Inventory List</h2>
            <table className='product-list-table'>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Available Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <select
                                    onChange={(e) => handleActionChange(e.target.value, item)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select Action
                                    </option>
                                    <option value="InventoryQuantity">InventoryQuantity</option>
                                    <option value="InventoryQuantityHistory">
                                        InventoryQuantityHistory
                                    </option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Productlist;
