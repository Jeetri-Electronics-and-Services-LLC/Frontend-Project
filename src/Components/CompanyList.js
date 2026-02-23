import React, { useState, useEffect } from "react";
import './CompanyList.css';

const CompanyList = ({isOpen}) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [form, setForm] = useState({ id: '', name: '', address: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:8080/companies/getcompanydetails");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:8080/companies/addcompanydetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const newCompany = await response.json();
      setCompanies([...companies, newCompany]);
      setForm({ id: '', name: '', address: '' });
      setIsAdding(false); // Hide the form after adding
      alert("Company added successfully!");
    } catch (err) {
      alert(`Error adding company: ${err.message}`);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/companies/updatecompanydetails/${form.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedCompany = await response.json();
      setCompanies(companies.map((company) => (company.id === updatedCompany.id ? updatedCompany : company)));
      setForm({ id: '', name: '', address: '' });
      setEditingCompany(null);
      alert("Company updated successfully!");
    } catch (err) {
      alert(`Error updating company: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/companies/deletecompanydetails/${id}`, {
        method: "DELETE",
      });
      setCompanies(companies.filter((company) => company.id !== id));
      alert("Company deleted successfully!");
    } catch (err) {
      alert(`Error deleting company: ${err.message}`);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setForm({ id: company.id, name: company.name, address: company.address });
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingCompany(null);
    setForm({ id: '', name: '', address: '' });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`company-list ${isOpen ? 'open' : ''}`}>
      <div className="company-list-div">
        {isAdding || editingCompany ? (
          <div className="company-list-div-one">
            <h3>{editingCompany ? "Update Company" : "Add Company"}</h3>
            <form className="company-list-div-one-form"
              onSubmit={(e) => {
                e.preventDefault();
                editingCompany ? handleUpdate() : handleAdd();
              }}
            >
              <input 
                type="hidden"
                name="id"
                value={form.id}
                onChange={handleChange}
              />
              <label >
                Name:
                <input 
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  
                />
              </label>
              <label >
                Address:
                <input 
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  
                />
              </label>
              <button type="submit" className="company-list-div-one-form-button">
                {editingCompany ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div className="comapny-list-div-two">
            <h2 >Company List</h2>
            <button className="company-list-div-two-button"
              onClick={handleAddClick}
            >
              Add Company
            </button>
            <table className="company-list-div-two-table" >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td>{company.id}</td>
                    <td>{company.name}</td>
                    <td>{company.address}</td>
                    <td>
                      <button className="company-list-div-two-button-two"
                        onClick={() => handleEdit(company)}
                        
                      >
                        Edit
                      </button>
                      <button className="company-list-div-two-button-two"
                        onClick={() => handleDelete(company.id)}
                        
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
