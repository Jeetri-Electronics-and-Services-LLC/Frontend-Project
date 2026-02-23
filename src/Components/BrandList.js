import React, { useEffect, useState } from "react";
import axios from "axios";
import './BrandList.css';

const BrandList = ({isOpen}) => {
  const [brandDetails, setBrandDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch brand details from the API
  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await axios.post("http://localhost:8080/brands/dispalyallbranddetails");
        setBrandDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch brand details");
        setLoading(false);
      }
    };

    fetchBrandDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className={`brand-list ${isOpen ? 'open' : ''}`}>
      <h1>Brand Details</h1>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand Address</th>
            <th>Sales Rep 1 Title</th>
            <th>Sales Rep 1 First Name</th>
            <th>Sales Rep 1 Last Name</th>
            <th>Sales Rep 1 Mobile Number</th>
            <th>Sales Rep 1 Email ID</th>
            <th>Sales Rep 2 Title</th>
            <th>Sales Rep 2 First Name</th>
            <th>Sales Rep 2 Last Name</th>
            <th>Sales Rep 2 Mobile Number</th>
            <th>Sales Rep 2 Email ID</th>
          </tr>
        </thead>
        <tbody>
          {brandDetails.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>{brand.brandaddress}</td>
              <td>{brand.salesrep1title}</td>
              <td>{brand.salesrep1firstname}</td>
              <td>{brand.salesrep1lastname}</td>
              <td>{brand.salesrep1mobilenumber}</td>
              <td>{brand.salesrep1emailid}</td>
              <td>{brand.salesrep2title}</td>
              <td>{brand.salesrep2firstname}</td>
              <td>{brand.salesrep2lastname}</td>
              <td>{brand.salesrep2mobilenumber}</td>
              <td>{brand.salesrep2emailid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandList;
