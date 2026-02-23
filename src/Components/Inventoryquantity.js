// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Inventoryquantity = () => {
//   const [productid, setProductid] = useState('');
//   const [productname, setProductname] = useState('');
//   const [existingquantity, setExistingquantity] = useState('');
//   const [addedquantity, setAddedquantity] = useState('');
//   const [totalavailablequantity, setTotalavailablequantity] = useState('');
//   const [createddate, setCreateddate] = useState('');
//   const [createdby, setCreatedby] = useState('');
//   const username = localStorage.getItem('username') || 'DefaultUser';

//   useEffect(() => {
//     // Set today's date and createdby from logged-in user
//     setCreateddate(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
//     setCreatedby(username); // Replace with actual logged-in user info
//   }, [username]);

//   useEffect(() => {
//     // Calculate total available quantity automatically
//     const total = (parseInt(existingquantity || 0) + parseInt(addedquantity || 0)).toString();
//     setTotalavailablequantity(total);
//   }, [existingquantity, addedquantity]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const inventoryData = {
//       productid,
//       productname,
//       existingquantity,
//       addedquantity,
//       totalavailablequantity,
//       createddate,
//       createdby,
//     };

//     try {
//       const response = await axios.post(
//         'http://localhost:8080/inventoryquantities/addnewinventoryquantity',
//         inventoryData
//       );
//       alert('Inventory added successfully!'); // Success alert
//       console.log('Inventory added successfully:', response.data);

//       // Reset form
//       setProductid('');
//       setProductname('');
//       setExistingquantity('');
//       setAddedquantity('');
//       setTotalavailablequantity('');
//     } catch (error) {
//       alert('There was an error saving the inventory.'); // Error alert
//       console.error('There was an error adding the inventory:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Inventory Quantity Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Product ID:</label>
//           <input
//             type="text"
//             value={productid}
//             onChange={(e) => setProductid(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Product Name:</label>
//           <input
//             type="text"
//             value={productname}
//             onChange={(e) => setProductname(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Existing Quantity:</label>
//           <input
//             type="number"
//             value={existingquantity}
//             onChange={(e) => setExistingquantity(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Added Quantity:</label>
//           <input
//             type="number"
//             value={addedquantity}
//             onChange={(e) => setAddedquantity(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Total Available Quantity:</label>
//           <input
//             type="number"
//             value={totalavailablequantity}
//             readOnly
//           />
//         </div>
//         <div>
//           <label>Created Date:</label>
//           <input
//             type="date"
//             value={createddate}
//             readOnly
//           />
//         </div>
//         <div>
//           <label>Created By:</label>
//           <input
//             type="text"
//             value={createdby}
//             readOnly
//           />
//         </div>
//         <div>
//           <button type="submit">Save Inventory</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Inventoryquantity;





import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Inventoryquantity.css';

const Inventoryquantity = () => {
    const location = useLocation();
    const productData = location.state?.product || {};
    const [productid, setProductid] = useState('');
    const [productname, setProductname] = useState('');
    const [existingquantity, setExistingquantity] = useState('');
    const [addedquantity, setAddedquantity] = useState('');
    const [totalavailablequantity, setTotalavailablequantity] = useState('');
    const [createddate, setCreateddate] = useState('');
    const [createdby, setCreatedby] = useState('');
    const username = localStorage.getItem('username') || 'DefaultUser';

    useEffect(() => {
        // Prefill fields with data from Productlist
        if (productData) {
            setProductid(productData.id);
            setProductname(productData.name);
            setExistingquantity(productData.quantity);
        }

        // Set today's date and createdby from logged-in user
        setCreateddate(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
        setCreatedby(username); // Replace with actual logged-in user info
    }, [productData, username]);

    useEffect(() => {
        // Calculate total available quantity automatically
        const total = (parseInt(existingquantity || 0) + parseInt(addedquantity || 0)).toString();
        setTotalavailablequantity(total);
    }, [existingquantity, addedquantity]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const inventoryData = {
            productid,
            productname,
            existingquantity,
            addedquantity,
            totalavailablequantity,
            createddate,
            createdby,
        };

        try {
            const response = await axios.post(
                `http://localhost:8080/inventoryquantities/addinventoryquantity/${productid}`,
                inventoryData
            );
            
            alert('Inventory added successfully!');
            console.log('Inventory added successfully:', response.data);

            // Reset form
            setProductid('');
            setProductname('');
            setExistingquantity('');
            setAddedquantity('');
            setTotalavailablequantity('');
        } catch (error) {
            alert('There was an error saving the inventory.');
            console.error('Error adding inventory:', error);
        }
    };

    return (
        <div className='inventory-quantity'>
            <h2>Inventory Quantity Form</h2>
            <form onSubmit={handleSubmit}>
                <div className='inventory-quantity-div'>
                    <label>Product ID:</label>
                    <input
                        type="text"
                        value={productid}
                        onChange={(e) => setProductid(e.target.value)}
                        readOnly
                    />
                </div>
                <div className='inventory-quantity-div'>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productname}
                        onChange={(e) => setProductname(e.target.value)}
                        readOnly
                    />
                </div>
                <div className='inventory-quantity-div'>
                    <label>Existing Quantity:</label>
                    <input
                        type="number"
                        value={existingquantity}
                        onChange={(e) => setExistingquantity(e.target.value)}
                        readOnly
                    />
                </div>
                <div className='inventory-quantity-div'>
                    <label>Added Quantity:</label>
                    <input
                        type="number"
                        value={addedquantity}
                        onChange={(e) => setAddedquantity(e.target.value)}
                        required
                    />
                </div>
                <div className='inventory-quantity-div'>
                    <label>Total Available Quantity:</label>
                    <input
                        type="number"
                        value={totalavailablequantity}
                        readOnly
                    />
                </div>
                {/* <div>
                    <label>Created Date:</label>
                    <input type="date" value={createddate} readOnly />
                </div>
                <div>
                    <label>Created By:</label>
                    <input type="text" value={createdby} readOnly />
                </div> */}
                <div className='inventory-quantity-button'>
                    <button type="submit">Save Inventory</button>
                </div>
            </form>
        </div>
    );
};

export default Inventoryquantity;
