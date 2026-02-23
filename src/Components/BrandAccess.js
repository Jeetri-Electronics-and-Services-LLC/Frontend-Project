import React, { useState } from 'react';
import './BrandAccess.css';

const BrandAccessForm = () => {
  const [brandId, setBrandId] = useState('');
  const [userId, setUserId] = useState('');

  const handleBrandIdChange = (event) => {
    setBrandId(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the request body
    const data = {
      brandId: parseInt(brandId),
      userId: parseInt(userId),
    };

    try {
      const response = await fetch('http://localhost:8080/brand-user/addbrand-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Data saved successfully!');
        setBrandId('');
        setUserId('');
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      alert('Error saving data');
    }
  };

  return (
    <div className='brand-access'>
      <h2>Brand Access</h2>
      <form onSubmit={handleSubmit}>
        <div className='brand-access-div'>
          <label htmlFor="brandId">Brand ID: </label>
          <input
            type="number"
            id="brandId"
            value={brandId}
            onChange={handleBrandIdChange}
            required
          />
        </div>
        <div className='brand-access-div'>
          <label htmlFor="userId">User ID: </label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
            required
          />
        </div>
        <button className='brand-access-button' type="submit">Save</button>
      </form>
    </div>
  );
};

export default BrandAccessForm;
