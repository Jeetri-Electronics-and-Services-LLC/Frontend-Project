import React, { useState } from "react";
import './AddRoleWithUser.css';

const AddRoleWithUser = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleData = { name, user: { id: userId } };

    try {
      const response = await fetch("http://localhost:8080/roles/addrolewithuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roleData),
      });

      if (response.ok) {
        setAlertMessage("Role added successfully!");
        setAlertType("success");
        setName("");
        setUserId("");
      } else {
        setAlertMessage("Failed to add role. Please check the data.");
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("An error occurred while adding the role.");
      setAlertType("error");
    }
  };

  return (
    <div className="addrole-withuser">
      <h2>Add Role with User</h2>

      <form onSubmit={handleSubmit}>
        <div className="addrole-withuser-div">
          <label htmlFor="name">Role Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="addrole-withuser-div">
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required

          />
        </div>
        <div className="addrole-withuser-button">
          <button
            type="submit"
          >
            Add Role
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddRoleWithUser;
