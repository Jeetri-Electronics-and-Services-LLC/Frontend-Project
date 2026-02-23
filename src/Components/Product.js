import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./Product.css";

const Product = ({ isOpen }) => {

  const initialFormData = {
    type_id: "",
    name: "",
    sku: "",
    quantity: "",
    date: "",
    reorder: "",
    description: "",
    msrp: "",
    salesprice: "",
    directdealerprice: "",
    promotionaldealerprice: "",
    indirectdealerprice: "",
    promotionalindirectdelarprice: "",
    distributorprice: "",
    promotionaldistributorprice: "",
    companyprice: "",
    category_id: "",
    brand_id: "",
    portfolio_id: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [portfolios, setPortfolios] = useState([]);

  // ================= FETCH DATA =================
  useEffect(() => {

    axios.post("http://localhost:8080/drop/getalltype")
      .then(res => setTypes(res.data));

    axios.post("http://localhost:8080/portfolios/getallportfolios")
      .then(res => setPortfolios(res.data));

    const userId = localStorage.getItem("userId");

    if (userId) {
      axios.post("http://localhost:8080/brands/brandsbyuserid", { userId })
        .then(res => setBrands(res.data))
        .catch(err => console.error("Brand Error:", err));
    }

    const storedBrandId = localStorage.getItem("brandId");
    if (storedBrandId) fetchCategories(storedBrandId);

  }, []);

  const fetchCategories = (brandId) => {
    axios.post("http://localhost:8080/categoriesbrand/categorylistbybrandid", { brandId })
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "brand_id") {
      const selectedBrand = brands.find(b => b.name === value);
      if (selectedBrand) {
        localStorage.setItem("brandId", selectedBrand.id);
        fetchCategories(selectedBrand.id);
      }
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/createproducts/addcreateproductdetailsonly", formData)
      .then(() => {
        alert("Product saved successfully!");
        setFormData(initialFormData);
      })
      .catch(() => alert("Failed to save product"));
  };

  return (
    <form className={`create-product-form ${isOpen ? "open" : ""}`} onSubmit={handleSubmit}>
      <h1>Create Product</h1>

      {/* ================= GENERAL DETAILS ================= */}
      <div className="form-section">
        <h3>General Product Details</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select name="type_id" value={formData.type_id} onChange={handleChange}>
              <option value="">Select Type</option>
              {types.map(t => (
                <option key={t.id} value={t.name}>{t.type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>SKU</label>
            <input name="sku" value={formData.sku} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input name="quantity" value={formData.quantity} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ================= INVENTORY DETAILS ================= */}
      <div className="form-section">
        <h3>Inventory Details</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Reorder Level</label>
            <input name="reorder" value={formData.reorder} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input name="description" value={formData.description} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ================= PRICING DETAILS ================= */}
      <div className="form-section">
        <h3>Pricing Details</h3>

        <div className="form-row">
          <div className="form-group">
            <label>MSRP</label>
            <input name="msrp" value={formData.msrp} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Sales Price</label>
            <input name="salesprice" value={formData.salesprice} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Direct Dealer Price</label>
            <input name="directdealerprice" value={formData.directdealerprice} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Promo Dealer Price</label>
            <input name="promotionaldealerprice" value={formData.promotionaldealerprice} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Indirect Dealer Price</label>
            <input name="indirectdealerprice" value={formData.indirectdealerprice} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Promo Indirect Dealer Price</label>
            <input name="promotionalindirectdelarprice" value={formData.promotionalindirectdelarprice} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Distributor Price</label>
            <input name="distributorprice" value={formData.distributorprice} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Promo Distributor Price</label>
            <input name="promotionaldistributorprice" value={formData.promotionaldistributorprice} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Company Price</label>
            <input name="companyprice" value={formData.companyprice} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ================= CLASSIFICATION ================= */}
      <div className="form-section">
        <h3>Product Classification</h3>

        <div className="form-row">
          <div className="form-group brand-group">
            <label>Brand</label>
            <select name="brand_id" value={formData.brand_id} onChange={handleChange}>
              <option value="">Select Brand</option>
              {brands.map(b => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group category-group">
            <label>Category</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group portfolio-group">
            <label>Portfolio</label>
            <select name="portfolio_id" value={formData.portfolio_id} onChange={handleChange}>
              <option value="">Select Portfolio</option>
              {portfolios.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ================= SUBMIT ================= */}
      <div className="submit-row">
        <button type="submit" className="submit-btn">Save Product</button>
      </div>

    </form>
  );
};

Product.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Product;