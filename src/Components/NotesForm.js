

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const NotesForm = () => {
//   const location = useLocation();
//   const { customerDisplayName, mobileNumber, recentCustomerStatus } = location.state || {};

//   const [formData, setFormData] = useState({
//     customerdisplayname_id: customerDisplayName || "",
//     mobilenumber: mobileNumber || "",
//     createdby: "",
//     createddate: new Date().toISOString().split("T")[0], // Defaults to today's date
//     customerstatus: recentCustomerStatus || "",
//     addnotes: "",
//   });

//   const [customerStatuses, setCustomerStatuses] = useState([]);

//   useEffect(() => {
//     // Fetch customer statuses
//     axios
//       .post("http://localhost:8080/customerstatus/getAllcustomerstatus")
//       .then((response) => {
//         setCustomerStatuses(response.data || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching customer statuses:", error);
//       });

//     // Set 'createdby' from local storage
//     const username = localStorage.getItem("username");
//     if (username) {
//       setFormData((prevData) => ({ ...prevData, createdby: username }));
//     }
//   }, []);

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:8080/notes/addnotes", formData)
//       .then(() => {
//         alert("Notes saved successfully!");
//         setFormData({
//           customerdisplayname_id: "",
//           mobilenumber: "",
//           createdby: formData.createdby,
//           createddate: new Date().toISOString().split("T")[0],
//           customerstatus: "",
//           addnotes: "",
//         });
//       })
//       .catch((error) => {
//         console.error("Error saving notes:", error);
//         alert("Failed to save notes. Please try again.");
//       });
//   };

//   return (
//     <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
//       <h2>Add Notes Form</h2>
//       <form onSubmit={handleSubmit}>
//       <div style={{ marginBottom: "10px" }}>
//           <label>Customer Display Name:</label>
//           <input
//             type="text"
//             name="customerdisplayname_id"
//             value={formData.customerdisplayname_id}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px", marginTop: "5px", background: "#f3f3f3" }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Mobile Number:</label>
//           <input
//             type="text"
//             name="mobilenumber"
//             value={formData.mobilenumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {/* <div style={{ marginBottom: "10px" }}>
//           <label>Created By:</label>
//           <input
//             type="text"
//             name="createdby"
//             value={formData.createdby}
//             readOnly
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Created Date:</label>
//           <input
//             type="date"
//             name="createddate"
//             value={formData.createddate}
//             readOnly
//           />
//         </div> */}
//         <div style={{ marginBottom: "10px" }}>
//           <label>Customer Status:</label>
//           <select
//             name="customerstatus"
//             value={formData.customerstatus}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>
//               Select Customer Status
//             </option>
//             {customerStatuses.map((status) => (
//               <option key={status.id} value={status.name}>
//                 {status.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Additional Notes:</label>
//           <textarea
//             name="addnotes"
//             value={formData.addnotes}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <button type="submit">Save Notes</button>
//       </form>
//     </div>
//   );
// };

// export default NotesForm;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import './NotesForm.css';

const NotesForm = () => {
  const location = useLocation();
  const { customerDisplayName, mobileNumber, recentCustomerStatus } = location.state || {};

  const [formData, setFormData] = useState({
    customerdisplayname_id: customerDisplayName || "",
    mobilenumber: mobileNumber || "",
    createdby: "",
    createddate: new Date().toISOString().split("T")[0], // Defaults to today's date
    customerstatus: recentCustomerStatus || "",
    addnotes: "",
  });

  const [customerStatuses, setCustomerStatuses] = useState([]);

  useEffect(() => {
    // Fetch customer statuses
    axios
      .post("http://localhost:8080/customerstatus/getAllcustomerstatus")
      .then((response) => {
        setCustomerStatuses(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching customer statuses:", error);
      });

    // Set 'createdby' from local storage
    const username = localStorage.getItem("username");
    if (username) {
      setFormData((prevData) => ({ ...prevData, createdby: username }));
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/notes/addnotes", formData)
      .then(() => {
        alert("Notes saved successfully!");
        setFormData({
          customerdisplayname_id: "",
          mobilenumber: "",
          createdby: formData.createdby,
          createddate: new Date().toISOString().split("T")[0],
          customerstatus: "",
          addnotes: "",
        });
      })
      .catch((error) => {
        console.error("Error saving notes:", error);
        alert("Failed to save notes. Please try again.");
      });
  };

  return (
    <div className="notes-form">
      <h2>Add Notes Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="notes-form-div">
          <label>Customer Display Name:</label>
          <input
            type="text"
            name="customerdisplayname_id"
            value={formData.customerdisplayname_id}
            onChange={handleChange}
            required

          />
        </div>
        <div className="notes-form-div">
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div style={{ marginBottom: "10px" }}>
          <label>Created By:</label>
          <input
            type="text"
            name="createdby"
            value={formData.createdby}
            readOnly
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Created Date:</label>
          <input
            type="date"
            name="createddate"
            value={formData.createddate}
            readOnly
          />
        </div> */}
        <div className="notes-form-div">
          <label>Customer Status:</label>
          <select
            name="customerstatus"
            value={formData.customerstatus}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Customer Status
            </option>
            {customerStatuses.map((status) => (
              <option key={status.id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
        <div className="notes-form-div">
          <label>Additional Notes:</label>
          <textarea
            name="addnotes"
            value={formData.addnotes}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="notes-form-button">
          <button type="submit">Save Notes</button>
        </div>

      </form>
    </div>
  );
};

export default NotesForm;
