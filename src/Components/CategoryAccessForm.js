import React, { useState, useEffect } from "react";
import './CategoryAccessForm.css';
const CategoryAccessForm = () => {
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:8080/drop/get-id-namesofcategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
  
    const data = {
      categoryId: parseInt(categoryId),
      brandId: parseInt(brandId),
    };
  
    try {
      const response = await fetch(
        "http://localhost:8080/category-brandids/addonlycategory-brandids",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
  
      let responseData;
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text(); // Handle plain text error
      }
  
      if (!response.ok) {
        console.error("Error Response:", responseData);
        throw new Error(responseData || "Failed to save data");
      }
  
      alert("Data saved successfully!");
      setCategoryId("");
      setBrandId("");
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };
  
  

  return (
    <div className="category-access">
      <h2>Category Access</h2>

      {loading ? <p>Loading categories...</p> : null}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="categoryId">Category: </label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>


        <div className="category-access-div">
          <label htmlFor="brandId">Brand ID: </label>
          <input
            type="number"
            id="brandId"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            required
          />
        </div>

        <button  className="category-access-button" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CategoryAccessForm;
