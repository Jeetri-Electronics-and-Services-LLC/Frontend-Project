// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AdminUserManagement.css';

// const AdminUserManagement = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     companyId: '',
//     firstname: '',
//     middlename: '',
//     lastname: '',
//     joiningdate: '',
//     mobilenumber: '',
//     email: '',
//     companyname: '',
//     streetname: '',
//     platnumber: '',
//     city: '',
//     state: '',
//     country: '',
//     zipcode: '',
//     dbaname: '',
//     status: '',
//     createdby: localStorage.getItem('username') || '',
//     createddate: new Date().toISOString().split('T')[0],
//   });

//   const [cities, setCities] = useState([]);
//   const [states, setStates] = useState([]);
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     // Fetch dropdown data
//     axios.post('http://localhost:8080/cities/getallcity').then((response) => setCities(response.data));
//     axios.post('http://localhost:8080/states/getallstates').then((response) => setStates(response.data));
//     axios.post('http://localhost:8080/countries/getallcountries').then((response) => setCountries(response.data));
//   }, []);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };


 
//   const handleSave = async (e) => {
//     e.preventDefault();

//     const payload = {
//       username: formData.username,
//       password: formData.password,
//       firstname: formData.firstname,
//       middlename: formData.middlename,
//       lastname: formData.lastname,
//       joiningdate: formData.joiningdate,
//       mobilenumber: formData.mobilenumber,
//       email: formData.email,
//       companyname: formData.companyname,
//       streetname: formData.streetname,
//       platnumber: formData.platnumber,
//       city: formData.city,
//       state: formData.state,
//       country: formData.country,
//       zipcode: formData.zipcode,
//       dbaname: formData.dbaname,
//       status: formData.status,
//       createdby: formData.createdby,
//       createddate: formData.createddate,
//       company: {
//         id: parseInt(formData.companyId, 10),
//       },
//     };
//     try {
//       await axios.post('http://localhost:8080/users/add-user-with-company', payload);
//       alert('User saved successfully');
//       // Reset form data
//       setFormData({
//         username: '',
//         password: '',
//         companyId: '',
//         firstname: '',
//         middlename: '',
//         lastname: '',
//         joiningdate: '',
//         mobilenumber: '',
//         email: '',
//         companyname: '',
//         streetname: '',
//         platnumber: '',
//         city: '',
//         state: '',
//         country: '',
//         zipcode: '',
//         dbaname: '',
//         status: '',
//         createdby: localStorage.getItem('username') || '',
//         createddate: new Date().toISOString().split('T')[0],
//       });
//     } catch (error) {
//       console.error('Error saving user:', error);
//       alert('Failed to save user');
//     }
//   };
    

//   return (
//     <div className="adminContainer">
//       <center>
//         <h2>Admin User Management</h2>
//       </center>
//       <form onSubmit={handleSave} className="adminForm">
//       <div className="adminInputGroup">
//   <label htmlFor="username">Username:</label>
//   <input
//   type="text"
//   id="username"
//   // value={formData.username}
//   onChange={handleInputChange}
//   autoComplete="off"
//   required
//   className="adminInput"
// />
// </div>
// <div className="adminInputGroup">
//   <label htmlFor="password">Password:</label>
//   <input
//   type="password"
//   id="password"
//   // value={formData.password}
//   onChange={handleInputChange}
//   autoComplete="off"
//   required
//   className="adminInput"
// />
// </div>

//         <div className="adminInputGroup">
//           <label htmlFor="companyId">Company ID:</label>
//           <input
//             type="text"
//             id="companyId"
//             value={formData.companyId}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="firstname">First Name:</label>
//           <input
//             type="text"
//             id="firstname"
//             value={formData.firstname}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="middlename">Middle Name:</label>
//           <input
//             type="text"
//             id="middlename"
//             value={formData.middlename}
//             onChange={handleInputChange}
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="lastname">Last Name:</label>
//           <input
//             type="text"
//             id="lastname"
//             value={formData.lastname}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="joiningdate">Joining Date:</label>
//           <input
//             type="date"
//             id="joiningdate"
//             value={formData.joiningdate}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="mobilenumber">Mobile Number:</label>
//           <input
//             type="text"
//             id="mobilenumber"
//             value={formData.mobilenumber}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="companyname">Company Name:</label>
//           <input
//             type="text"
//             id="companyname"
//             value={formData.companyname}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="streetname">Street Name:</label>
//           <input
//             type="text"
//             id="streetname"
//             value={formData.streetname}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="platnumber">Plat Number:</label>
//           <input
//             type="text"
//             id="platnumber"
//             value={formData.platnumber}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="city">City:</label>
//           <select id="city" value={formData.city} onChange={handleInputChange} required className="adminInput">
//             <option value="">Select City</option>
//             {cities.map((city) => (
//               <option key={city.id} value={city.name}>
//                 {city.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="state">State:</label>
//           <select id="state" value={formData.state} onChange={handleInputChange} required className="adminInput">
//             <option value="">Select State</option>
//             {states.map((state) => (
//               <option key={state.id} value={state.name}>
//                 {state.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="country">Country:</label>
//           <select id="country" value={formData.country} onChange={handleInputChange} required className="adminInput">
//             <option value="">Select Country</option>
//             {countries.map((country) => (
//               <option key={country.id} value={country.name}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="zipcode">Zip Code:</label>
//           <input
//             type="text"
//             id="zipcode"
//             value={formData.zipcode}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="dbaname">DBA Name:</label>
//           <input
//             type="text"
//             id="dbaname"
//             value={formData.dbaname}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//           <label htmlFor="status">Status:</label>
//           <input
//             type="text"
//             id="status"
//             value={formData.status}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//         <div className="adminInputGroup">
//            {/* <label htmlFor="createdby">Created By:</label> */}
//            <input type="hidden" name="createdby" value={formData.createdby} />
//         </div>
//         <div className="adminInputGroup">
//           {/* <label htmlFor="createddate">Created Date:</label> */}
//           <input type="hidden" name="createddate" value={formData.createddate} />
//         </div>

//         <button type="submit" className="adminButton">
//           Save User
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminUserManagement;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUserManagement.css';

const AdminUserManagement = ({isOpen}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    companyId: '',
    firstname: '',
    middlename: '',
    lastname: '',
    joiningdate: '',
    mobilenumber: '',
    email: '',
    companyname: '',
    streetname: '',
    platnumber: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    dbaname: '',
    status: '',
    createdby: localStorage.getItem('username') || '',
    createddate: new Date().toISOString().split('T')[0],
  });

  const [statuses, setStatuses ]= useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch dropdown data
    axios.post('http://localhost:8080/userstatus/getallUserstatuses').then((response) => setStatuses(response.data));
    axios.post('http://localhost:8080/states/getallstates').then((response) => setStates(response.data));
    axios.post('http://localhost:8080/countries/getallcountries').then((response) => setCountries(response.data));
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };


 
  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.password,
      firstname: formData.firstname,
      middlename: formData.middlename,
      lastname: formData.lastname,
      joiningdate: formData.joiningdate,
      mobilenumber: formData.mobilenumber,
      email: formData.email,
      companyname: formData.companyname,
      streetname: formData.streetname,
      platnumber: formData.platnumber,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zipcode: formData.zipcode,
      dbaname: formData.dbaname,
      status: formData.status,
      createdby: formData.createdby,
      createddate: formData.createddate,
      company: {
        id: parseInt(formData.companyId, 10),
      },
    };
    try {
      await axios.post('http://localhost:8080/users/add-user-with-company', payload);
      alert('User saved successfully');
      // Reset form data
      setFormData({
        username: '',
        password: '',
        companyId: '',
        firstname: '',
        middlename: '',
        lastname: '',
        joiningdate: '',
        mobilenumber: '',
        email: '',
        companyname: '',
        streetname: '',
        platnumber: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        dbaname: '',
        status: '',
        createdby: localStorage.getItem('username') || '',
        createddate: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user');
    }
  };
    

  return (
    <div className={`adminContainer ${isOpen ? 'open' : ''}`}>
  <center>
    <h2>Admin User Management</h2>
  </center>
  <form onSubmit={handleSave} className="adminForm">
    {/* Group 1: Username, Password, Status */}
    <div className="inputGroupBox">
      <div className="adminInputGroup">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={handleInputChange}
          autoComplete="off"
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handleInputChange}
          autoComplete="off"
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="status">Status:</label>
        <select id="status" onChange={handleInputChange} required className="adminInput">
          <option value="">Select Status</option>
          {statuses.map((status) => (
            <option key={status.id} value={status.name}>
              {status.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Group 2: First Name, Middle Name, Last Name, Mobile Number, DBA Name */}
    <div className="inputGroupBox">
      <div className="adminInputGroup">
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstname"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="middlename">Middle Name:</label>
        <input
          type="text"
          id="middlename"
          onChange={handleInputChange}
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="mobilenumber">Mobile Number:</label>
        <input
          type="text"
          id="mobilenumber"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
           <label htmlFor="email">Email:</label>
           <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="adminInput"
          />
        </div>
      <div className="adminInputGroup">
        <label htmlFor="dbaname">DBA Name:</label>
        <input
          type="text"
          id="dbaname"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
    </div>

    {/* Group 3: Company ID, Joining Date, Company Name */}
    <div className="inputGroupBox">
      <div className="adminInputGroup">
        <label htmlFor="companyId">Company ID:</label>
        <input
          type="text"
          id="companyId"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="joiningdate">Joining Date:</label>
        <input
          type="date"
          id="joiningdate"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="companyname">Company Name:</label>
        <input
          type="text"
          id="companyname"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
    </div>

    {/* Group 4: Address Fields */}
    <div className="inputGroupBox">
      <div className="adminInputGroup">
        <label htmlFor="streetname">Street Name:</label>
        <input
          type="text"
          id="streetname"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="platnumber">Plat Number:</label>
        <input
          type="text"
          id="platnumber"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="state">State:</label>
        <select id="state" onChange={handleInputChange} required className="adminInput">
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="adminInputGroup">
        <label htmlFor="country">Country:</label>
        <select id="country" onChange={handleInputChange} required className="adminInput">
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="adminInputGroup">
        <label htmlFor="zipcode">Zip Code:</label>
        <input
          type="text"
          id="zipcode"
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
    </div>
<center>
    <button type="submit" className="adminButton">
      Save User
    </button>
    </center>
  </form>
</div>
  );
};

export default AdminUserManagement;