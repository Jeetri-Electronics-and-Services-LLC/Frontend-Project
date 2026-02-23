import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersList.css';

const UserList = ({isOpen}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/users/getalluserdetailswithcompanyid', {
          method: 'POST', // POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ companyId: 1 }), // Pass companyId in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/users/getUserdetailsById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
  
      const userData = await response.json();
      navigate('/edituserlist', { state: { userData } }); // Pass data via state
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user with ID:', id);
      // Implement API call for deletion
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`user-list ${isOpen ? 'open' : ''}`}>
      <h2>User List</h2>
      <table className='user-list-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Joining Date</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Company Id</th>
            <th>Company Name</th>
            <th>Street Name</th>
            <th>Plate Number</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Zipcode</th>
            <th>DBA Name</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.firstname}</td>
              <td>{user.middlename}</td>
              <td>{user.lastname}</td>
              <td>{user.joiningdate}</td>
              <td>{user.mobilenumber}</td>
              <td>{user.email}</td>
              <td>{user.companyId}</td>
              <td>{user.companyname}</td>
              <td>{user.streetname}</td>
              <td>{user.platnumber}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.country}</td>
              <td>{user.zipcode}</td>
              <td>{user.dbaname}</td>
              <td>{user.status}</td>
              <td>{user.createdby}</td>
              <td>{user.createddate}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
