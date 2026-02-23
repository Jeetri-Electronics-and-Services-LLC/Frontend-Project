// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import './AdminUserManagement.css';

// const Edituserlist = () => {
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
  
//   const location = useLocation();
//   const userData = location.state?.userData;
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [statuses, setStatuses ]= useState([]);
//   const [states, setStates] = useState([]);
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     if (userData) {
//       console.log("Setting form data:", userData); // Debugging log
//       setFormData(userData);
//     } else if (id) {
//       axios.post('http://localhost:8080/users/getUserdetailsById', { id: parseInt(id) })
//         .then(response => {
//           console.log("Fetched User Data by ID:", response.data); // Debugging log
//           setFormData(response.data);
//         })
//         .catch(error => console.error('Error fetching user details:', error));
//     }
//   }, [userData, id]);
  
  
  
//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [statusRes, stateRes, countryRes] = await Promise.all([
//           axios.post('http://localhost:8080/userstatus/getallUserstatuses'),
//           axios.post('http://localhost:8080/states/getallstates'),
//           axios.post('http://localhost:8080/countries/getallcountries'),
//         ]);
  
//         console.log('Dropdown data:', statusRes.data, stateRes.data, countryRes.data);
  
//         setStatuses(statusRes.data || []);
//         setStates(stateRes.data || []);
//         setCountries(countryRes.data || []);
//       } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//         alert(`Error fetching dropdown data: ${error.message}`);
//       }
//     };
  
//     fetchDropdowns();
//   }, []);
  

  

  
  
  

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value
//     }));
//   };
  
//   useEffect(() => {
//     if (userData) {
//       setFormData(userData); // Populate form with received user data
//     }
//   }, [userData]);

 
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
//         await axios.post(`http://localhost:8080/users/updateuserdetails/${formData.id}`, payload);

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
//   <center>
//     <h2>Admin User Management</h2>
//   </center>
//   <form onSubmit={handleSave} className="adminForm">
//     {/* Group 1: Username, Password, Status */}
//     <div className="inputGroupBox">
//       <div className="adminInputGroup">
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={formData.username || ''}
//           onChange={handleInputChange}
//           autoComplete="off"
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value = {formData.password || ''}
//           onChange={handleInputChange}
//           autoComplete="off"
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//           <label htmlFor="status">Status:</label>
//           <select id="status" value={formData.status || ''} onChange={handleInputChange} required className="adminInput">
//     <option value="">Select Status</option>
//     {statuses.map((status) => (
//       <option key={status.id} value={status.name}>{status.name}</option>
//     ))}
//   </select>
//         </div>
//     </div>

//     {/* Group 2: First Name, Middle Name, Last Name, Mobile Number, DBA Name */}
//     <div className="inputGroupBox">
//       <div className="adminInputGroup">
//         <label htmlFor="firstname">First Name:</label>
//         <input
//           type="text"
//           id="firstname"
//           value = {formData.firstname || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//         <label htmlFor="middlename">Middle Name:</label>
//         <input
//           type="text"
//           id="middlename"
//           value = {formData.middlename || ''}
//           onChange={handleInputChange}
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//         <label htmlFor="lastname">Last Name:</label>
//         <input
//           type="text"
//           id="lastname"
//           value = {formData.lastname || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//         <label htmlFor="mobilenumber">Mobile Number:</label>
//         <input
//           type="text"
//           id="mobilenumber"
//           value = {formData.mobilenumber || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//            <label htmlFor="email">Email:</label>
//            <input
//             type="email"
//             id="email"
//             value={formData.email || ''}
//             onChange={handleInputChange}
//             required
//             className="adminInput"
//           />
//         </div>
//       <div className="adminInputGroup">
//         <label htmlFor="dbaname">DBA Name:</label>
//         <input
//           type="text"
//           id="dbaname"
//           value = {formData.dbaname || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//     </div>

//     {/* Group 3: Company ID, Joining Date, Company Name */}
//     <div className="inputGroupBox">
//       <div className="adminInputGroup">
//         <label htmlFor="companyId">Company ID:</label>
//         <input
//           type="text"
//           id="companyId"
//           value = {formData.companyId || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//         <label htmlFor="joiningdate">Joining Date:</label>
//         <input
//           type="date"
//           id="joiningdate"
//           value = {formData.joiningdate || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//         <label htmlFor="companyname">Company Name:</label>
//         <input
//           type="text"
//           id="companyname"
//           value={formData.companyname || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//     </div>

//     {/* Group 4: Address Fields */}
//     <div className="inputGroupBox">
//       <div className="adminInputGroup">
//         <label htmlFor="streetname">Street Name:</label>
//         <input
//           type="text"
//           id="streetname"
//           value={formData.streetname || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//         <label htmlFor="platnumber">Plat Number:</label>
//         <input
//           type="text"
//           id="platnumber"
//           value={formData.platnumber || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//         <label htmlFor="city">City:</label>
//         <input
//           type="text"
//           id="city"
//           value={formData.city || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//       <div className="adminInputGroup">
//           <label htmlFor="state">State:</label>
//           <select id="state" value={formData.state || ''} onChange={handleInputChange}>
//   <option value="">Select State</option>
//   {states.map((state) => (
//     <option key={state.id} value={state.name}>{state.name}</option>
//   ))}
// </select>
//         </div>
        

        
//         <div className="adminInputGroup">
//           <label htmlFor="country">Country:</label>
//           <select id="country" value={formData.country || ''} onChange={handleInputChange} required className="adminInput">
//     <option value="">Select Country</option>
//     {countries.map((country) => (
//       <option key={country.id} value={country.name} selected={country.name === formData.country}>
//       {country.name}
//     </option>
    
//     ))}
//   </select>
//         </div>
//       <div className="adminInputGroup">
//         <label htmlFor="zipcode">Zip Code:</label>
//         <input
//           type="text"
//           id="zipcode"
//           value={formData.zipcode || ''}
//           onChange={handleInputChange}
//           required
//           className="adminInput"
//         />
//       </div>
//     </div>
// <center>
//     <button type="submit" className="adminButton">
//       Save User
//     </button>
//     </center>
//   </form>
// </div>
//   );
// };

// export default Edituserlist;





import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './AdminUserManagement.css';

const Edituserlist = ({isOpen}) => {
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
  
  const location = useLocation();
  const userData = location.state?.userData;
  const { id } = useParams();
  const navigate = useNavigate();
  const [statuses, setStatuses ]= useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (userData) {
      console.log("Setting form data:", userData); // Debugging log
      setFormData(userData);
    } else if (id) {
      axios.post('http://localhost:8080/users/getUserdetailsById', { id: parseInt(id) })
        .then(response => {
          console.log("Fetched User Data by ID:", response.data); // Debugging log
          setFormData(response.data);
        })
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, [userData, id]);
  
  
  
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [statusRes, stateRes, countryRes] = await Promise.all([
          axios.post('http://localhost:8080/userstatus/getallUserstatuses'),
          axios.post('http://localhost:8080/states/getallstates'),
          axios.post('http://localhost:8080/countries/getallcountries'),
        ]);
  
        console.log('Dropdown data:', statusRes.data, stateRes.data, countryRes.data);
  
        setStatuses(statusRes.data || []);
        setStates(stateRes.data || []);
        setCountries(countryRes.data || []);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
        alert(`Error fetching dropdown data: ${error.message}`);
      }
    };
  
    fetchDropdowns();
  }, []);
  

  

  
  
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };
  
  useEffect(() => {
    if (userData) {
      setFormData(userData); // Populate form with received user data
    }
  }, [userData]);

 
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
        await axios.post(`http://localhost:8080/users/updateuserdetails/${formData.id}`, payload);

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
          value={formData.username || ''}
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
          value = {formData.password || ''}
          onChange={handleInputChange}
          autoComplete="off"
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
          <label htmlFor="status">Status:</label>
          <select id="status" value={formData.status || ''} onChange={handleInputChange} required className="adminInput">
    <option value="">Select Status</option>
    {statuses.map((status) => (
      <option key={status.id} value={status.name}>{status.name}</option>
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
          value = {formData.firstname || ''}
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
          value = {formData.middlename || ''}
          onChange={handleInputChange}
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          value = {formData.lastname || ''}
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
          value = {formData.mobilenumber || ''}
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
            value={formData.email || ''}
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
          value = {formData.dbaname || ''}
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
          value = {formData.companyId || ''}
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
          value = {formData.joiningdate || ''}
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
          value={formData.companyname || ''}
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
          value={formData.streetname || ''}
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
          value={formData.platnumber || ''}
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
          value={formData.city || ''}
          onChange={handleInputChange}
          required
          className="adminInput"
        />
      </div>
      <div className="adminInputGroup">
          <label htmlFor="state">State:</label>
          <select id="state" value={formData.state || ''} onChange={handleInputChange}>
  <option value="">Select State</option>
  {states.map((state) => (
    <option key={state.id} value={state.name}>{state.name}</option>
  ))}
</select>
        </div>
        

        
        <div className="adminInputGroup">
          <label htmlFor="country">Country:</label>
          <select id="country" value={formData.country || ''} onChange={handleInputChange} required className="adminInput">
    <option value="">Select Country</option>
    {countries.map((country) => (
      <option key={country.id} value={country.name} selected={country.name === formData.country}>
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
          value={formData.zipcode || ''}
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

export default Edituserlist;