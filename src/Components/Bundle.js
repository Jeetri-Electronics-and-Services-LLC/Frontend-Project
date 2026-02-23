// import React, { useState, useEffect } from 'react'; 
// import axios from 'axios';
// import './Bundle.css';

// const BundlePage = () => {
//   const [bundle, setBundle] = useState({
//     name: '',
//     sku: '',
//     description: '',
//     products: [{ name: '', qty: 1, description: '', salesprice: 0, amount: 0 }],
//   });

//   const [productOptions, setProductOptions] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [activeSearchIndex, setActiveSearchIndex] = useState(null);

//   // Fetch the products for the dropdown from the backend
//   useEffect(() => {
//     axios.post('http://localhost:8080/createproducts/listofproducts')
//       .then(response => {
//         setProductOptions(response.data);
//         setFilteredProducts([]); // Initialize with an empty list
//       })
//       .catch(error => {
//         console.error('Error fetching product options:', error);
//       });
//   }, []);

//   // Fetch product details (description, salesprice) based on selected product name
//   const fetchProductDetails = (index, productName) => {
//     axios.post('http://localhost:8080/createproducts/productsdetails', { name: productName })
//       .then(response => {
//         const updatedProducts = [...bundle.products];
//         const productData = response.data;
        
//         // Ensure productData contains both description and salesprice
//         if (productData) {
//           updatedProducts[index].description = productData.description || '';
//           updatedProducts[index].salesprice = productData.salesprice || 0;
//           updatedProducts[index].amount = updatedProducts[index].qty * productData.salesprice;
//         }

//         setBundle({ ...bundle, products: updatedProducts });
//       })
//       .catch(error => {
//         console.error('Error fetching product details:', error);
//       });
//   };

//   const handleChange = (e) => {
//     setBundle({ ...bundle, [e.target.name]: e.target.value });
//   };

//   const handleProductSearch = (e, index) => {
//     const searchTerm = e.target.value.toLowerCase();
//     setActiveSearchIndex(index);

//     if (searchTerm.length > 0) {
//       const filtered = productOptions.filter((product) =>
//         product.name.toLowerCase().startsWith(searchTerm)
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts([]); // Clear results when input is empty
//     }

//     const updatedProducts = [...bundle.products];
//     updatedProducts[index].name = searchTerm;
//     setBundle({ ...bundle, products: updatedProducts });
//   };

//   const handleSelectProduct = (selectedProduct) => {
//     const updatedProducts = [...bundle.products];
//     updatedProducts[activeSearchIndex].name = selectedProduct.name;
//     fetchProductDetails(activeSearchIndex, selectedProduct.name);
//     setActiveSearchIndex(null);
//     setFilteredProducts([]); // Clear the product list after selection
//   };

//   const handleProductChange = (index, e) => {
//     const updatedProducts = [...bundle.products];
//     updatedProducts[index][e.target.name] = e.target.value;

//     if (e.target.name === 'qty') {
//       updatedProducts[index].amount = updatedProducts[index].qty * updatedProducts[index].salesprice; // Recalculate amount
//     }

//     setBundle({ ...bundle, products: updatedProducts });
//   };

//   const addProduct = () => {
//     setBundle({
//       ...bundle,
//       products: [...bundle.products, { name: '', qty: 1, description: '', salesprice: 0, amount: 0 }],
//     });
//   };

//   const deleteProduct = (index) => {
//     const updatedProducts = bundle.products.filter((_, i) => i !== index);
//     setBundle({ ...bundle, products: updatedProducts });
//   };

//   const saveBundle = () => {
//     axios.post('http://localhost:8080/bundles/createbundlle', bundle)
//       .then(response => {
//         alert('Bundle saved successfully!');
//         console.log('Bundle saved', response.data);

//         // Reset the form after successful save
//         setBundle({
//           name: '',
//           sku: '',
//           description: '',
//           products: [{ name: '', qty: 1, description: '', salesprice: 0, amount: 0 }],
//         });
//       })
//       .catch(error => {
//         console.error('There was an error saving the bundle!', error);
//         alert('Error saving the bundle!');
//       });
//   };

//   return (
//     <div className="bundle-container">
//       <h1 className="bundle-title">Create a Bundle</h1>

//       <div className="bundle-form-group">
//         <label className="bundle-label">Name: </label>
//         <input type="text" name="name" value={bundle.name} onChange={handleChange} className="bundle-input" />
//       </div>

//       <div className="bundle-form-group">
//         <label className="bundle-label">SKU: </label>
//         <input type="text" name="sku" value={bundle.sku} onChange={handleChange} className="bundle-input" />
//       </div>

//       <div className="bundle-form-group">
//         <label className="bundle-label">Description: </label>
//         <input type="text" name="description" value={bundle.description} onChange={handleChange} className="bundle-input" />
//       </div>

//       <h2 className="bundle-subtitle">Products/Services</h2>

//       <table className="bundle-table">
//         <thead>
//           <tr>
//             <th className="bundle-table-header">Name</th>
//             <th className="bundle-table-header">Qty</th>
//             <th className="bundle-table-header">Description</th>
//             <th className="bundle-table-header">Sales Price</th>
//             <th className="bundle-table-header">Amount</th>
//             <th className="bundle-table-header">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bundle.products.map((item, index) => (
//             <tr key={index}>
//               <td>
//                 <input
//                   type="text"
//                   name="name"
//                   value={item.name}
//                   onChange={(e) => handleProductSearch(e, index)}
//                   className="bundle-input"
//                   placeholder="Search Product"
//                 />
//                 {filteredProducts.length > 0 && (
//                   <div style={{ 
//                       position: 'absolute', 
//                       backgroundColor: 'white', 
//                       border: '1px solid #ccc', 
//                       maxHeight: '150px', // Set a fixed height for the dropdown box
//                       overflowY: 'auto', // Enable vertical scroll
//                       zIndex: 1,
//                       width: '20%' // Match the width of the input
//                     }}>
//                     {filteredProducts.map((product) => (
//                       <div
//                         key={product.id}
//                         onClick={() => handleSelectProduct(product)}
//                         style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
//                       >
//                         {product.name}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   name="qty"
//                   value={item.qty}
//                   onChange={(e) => handleProductChange(index, e)}
//                   className="bundle-qty-input"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   name="description"
//                   value={item.description}
//                   readOnly
//                   className="bundle-input"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   name="salesprice"
//                   value={item.salesprice}
//                   readOnly
//                   className="bundle-input"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   name="amount"
//                   value={item.amount}
//                   readOnly
//                   className="bundle-input"
//                 />
//               </td>
//               <td>
//                 <button type="button" onClick={addProduct} className="bundle-action-button">Add</button>
//                 <button type="button" onClick={() => deleteProduct(index)} className="bundle-action-button">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="bundle-button-container">
//         <button type="button" onClick={saveBundle} className="bundle-save-button">Save Bundle</button>
//       </div>
//     </div>
//   );
// };

// export default BundlePage;

//NEW


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bundle.css";

const BundlePage = () => {
  const [bundle, setBundle] = useState({
    name: "",
    sku: "",
    description: "",
    products: [{ productid: "", name: "", qty: 1, description: "", salesprice: 0, amount: 0 }],
  });

  const [productOptions, setProductOptions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeSearchIndex, setActiveSearchIndex] = useState(null);

  useEffect(() => {
    axios.post("http://localhost:8080/createproducts/listofproducts")
      .then(res => setProductOptions(res.data))
      .catch(err => console.error(err));
  }, []);

  const fetchProductDetails = (index, name) => {
    axios.post("http://localhost:8080/createproducts/productsdetails", { name })
      .then(res => {
        const updated = [...bundle.products];
        const p = res.data;
        if (p) {
          updated[index].productid = p.id;
          updated[index].description = p.description;
          updated[index].salesprice = p.salesprice;
          updated[index].amount = updated[index].qty * p.salesprice;
        }
        setBundle({ ...bundle, products: updated });
      });
  };

  const handleBundleChange = (e) => {
    setBundle({ ...bundle, [e.target.name]: e.target.value });
  };

  const handleProductSearch = (e, index) => {
    const val = e.target.value;
    setActiveSearchIndex(index);

    const updated = [...bundle.products];
    updated[index].name = val;
    setBundle({ ...bundle, products: updated });

    if (val.length > 0) {
      setFilteredProducts(productOptions.filter(p => p.name.toLowerCase().includes(val.toLowerCase())));
    } else {
      setFilteredProducts([]);
    }
  };

  const selectProduct = (p) => {
    const updated = [...bundle.products];
    updated[activeSearchIndex].name = p.name;
    fetchProductDetails(activeSearchIndex, p.name);
    setFilteredProducts([]);
    setActiveSearchIndex(null);
    setBundle({ ...bundle, products: updated });
  };

  const handleProductChange = (index, e) => {
    const updated = [...bundle.products];
    updated[index][e.target.name] = e.target.value;

    if (e.target.name === "qty") {
      updated[index].amount = updated[index].qty * updated[index].salesprice;
    }

    setBundle({ ...bundle, products: updated });
  };

  const addRow = () => {
    setBundle({
      ...bundle,
      products: [...bundle.products, { productid: "", name: "", qty: 1, description: "", salesprice: 0, amount: 0 }],
    });
  };

  const deleteRow = (index) => {
    setBundle({ ...bundle, products: bundle.products.filter((_, i) => i !== index) });
  };

  const saveBundle = () => {
    axios.post("http://localhost:8080/bundles/createbundlle", bundle)
      .then(() => alert("Bundle Saved Successfully"))
      .catch(() => alert("Error Saving Bundle"));
  };

  return (
    <div className="bundle-page-wide">

      <h2 className="bundle-heading">Create Bundle</h2>

      {/* TOP FORM */}
      <div className="bundle-top-grid">
        <div className="bundle-field">
          <label>Name</label>
          <input name="name" value={bundle.name} onChange={handleBundleChange} />
        </div>

        <div className="bundle-field">
          <label>SKU</label>
          <input name="sku" value={bundle.sku} onChange={handleBundleChange} />
        </div>

        <div className="bundle-field">
          <label>Description</label>
          <input name="description" value={bundle.description} onChange={handleBundleChange} />
        </div>
      </div>

      {/* TABLE */}
      <table className="bundle-table-wide">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Description</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bundle.products.map((p, index) => (
            <tr key={index}>
              <td><input name="productid" value={p.productid} onChange={(e) => handleProductChange(index, e)} /></td>

              <td className="search-box">
                <input name="name" value={p.name} onChange={(e) => handleProductSearch(e, index)} />

                {filteredProducts.length > 0 && activeSearchIndex === index && (
                  <div className="search-dropdown">
                    {filteredProducts.map(item => (
                      <div key={item.id} onClick={() => selectProduct(item)}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </td>

              <td><input name="qty" value={p.qty} onChange={(e) => handleProductChange(index, e)} /></td>
              <td><input value={p.description} readOnly /></td>
              <td><input value={p.salesprice} readOnly /></td>
              <td><input value={p.amount} readOnly /></td>

              <td>
                <button onClick={addRow}>+</button>
                <button onClick={() => deleteRow(index)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="bundle-save-btn" onClick={saveBundle}>Save Bundle</button>

    </div>
  );
};

export default BundlePage;