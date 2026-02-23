import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './ShipmentForm.css';

const ShipmentForm = ({ isOpen }) => {
  const { invoiceId } = useParams(); // Get invoiceId from URL
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shipmentQuantity, setShipmentQuantity] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

  useEffect(() => {
    if (invoiceId) {
      fetchProducts(invoiceId);
    }
  }, [invoiceId]);

  const fetchProducts = async (invoiceId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/invoices/basedoninvoiceiddisplayinvoicewithlistproducts",
        { invoiceId }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductSelect = (event) => {
    const productId = event.target.value;
    const product = products.find((p) => p.productId.toString() === productId);
    setSelectedProduct(product);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedProduct || !shipmentQuantity || !shipmentDate) {
      alert("Please fill all fields");
      return;
    }

    const shipmentData = {
      invoiceid: invoiceId,
      productid: selectedProduct.productId,
      productname: selectedProduct.productname,
      quantity: selectedProduct.quantity,
      shipmentquantity: shipmentQuantity,
      shipmentdate: shipmentDate,
      userid: userId,
    };

    try {
      await axios.post(
        `http://localhost:8080/shipments/basedoninvoiceaddshipment/${userId}/${invoiceId}`,
        shipmentData
      );
      alert("Shipment added successfully!");
    } catch (error) {
      console.error("Error adding shipment:", error);
      alert("Failed to add shipment");
    }
  };

  return (
    <div className={`shipment-form ${isOpen ? 'open' : ''}`}>
      <h2>Add Shipment for Invoice ID: {invoiceId}</h2>
      <form onSubmit={handleSubmit} className="shipment-form-div">
        <label>Product:</label>
        <select onChange={handleProductSelect} required>
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.productname}
            </option>
          ))}
        </select>

        {selectedProduct && (
          <>
            <label>Product ID:</label>
            <input type="text" value={selectedProduct.productId} readOnly />

            <label>Product Name:</label>
            <input type="text" value={selectedProduct.productname} readOnly />

            <label>Quantity:</label>
            <input type="text" value={selectedProduct.quantity} readOnly />
          </>
        )}
        <div className="shipment-form-div1">
          <label>Shipment Quantity:</label>
          <input
            type="number"
            value={shipmentQuantity}
            onChange={(e) => setShipmentQuantity(e.target.value)}
            required
          />

          <label>Shipment Date:</label>
          <input
            type="date"
            value={shipmentDate}
            onChange={(e) => setShipmentDate(e.target.value)}
            required
          />
        </div>


        <div className="shipment-form-button">
          <button type="submit">Submit Shipment</button>
        </div>

      </form>
    </div>
  );
};

export default ShipmentForm;
