import { useState, useEffect } from "react";
import './Categoriesdd.css';

const Categoriesdd = ({ loggedInUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    createddate: "",
    createdby: "",
  });

  const username = localStorage.getItem("username") || "DefaultUser";
  useEffect(() => {
    setFormData({
      ...formData,
      createddate: new Date().toISOString().split("T")[0], // System date in YYYY-MM-DD format
      createdby: username, // Get logged-in user dynamically
    });
  }, [loggedInUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/drop/addcategorydetailsonly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Category created successfully!");
        setFormData({ name: "", createddate: new Date().toISOString().split("T")[0], createdby: loggedInUser });
      } else {
        alert("Failed to create category.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="categoriesdd">
      <div className="categoriesdd-div">
        <label>Category Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="categoriesdd-div">
        <label>Created Date:</label>
        <input type="text" name="createddate" value={formData.createddate} readOnly />
      </div>
      <div className="categoriesdd-div">
        <label>Created By:</label>
        <input type="text" name="createdby" value={formData.createdby} readOnly />
      </div >
      <button className="categoriesdd-button" type="submit">Create Category</button>
    </form>
  );
};

export default Categoriesdd;
