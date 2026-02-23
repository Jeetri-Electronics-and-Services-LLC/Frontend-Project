// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './CustomerForm.css'; // Ensure you have this CSS file
// // import { useParams, useNavigate } from 'react-router-dom';

// // const EditCustomer = () => {
// //     const { customerId } = useParams(); // Get customerId from the URL
// //     const navigate = useNavigate();

// //     // Function to get current IST time using Asia/Kolkata timezone
// //     const getIndianStandardTime = () => {
// //         const options = {
// //             timeZone: 'Asia/Kolkata',
// //             year: 'numeric',
// //             month: '2-digit',
// //             day: '2-digit',
// //             hour: '2-digit',
// //             minute: '2-digit',
// //             second: '2-digit',
// //             hour12: false,
// //         };

// //         const formatter = new Intl.DateTimeFormat('en-GB', options);
// //         const [
// //             { value: day },,
// //             { value: month },,
// //             { value: year },,
// //             { value: hour },,
// //             { value: minute },,
// //             { value: second }
// //         ] = formatter.formatToParts(new Date());

// //         return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
// //     };



// //     // Initialize formData state
// //     const [formData, setFormData] = useState({
// //         title: '',
// //         firstname: '',
// //         middlename: '',
// //         lastname: '',
// //         suffix: '',
// //         companyname: '',
// //         customerdisplayname: '',
// //         emailid: '',
// //         phonenumber: '',
// //         mobilenumber: '',
// //         fax: '',
// //         other: '',
// //         website: '',
// //         nametoprintonchecks: '',
// //         billingaddress: '',
// //         shippingaddress: '',
// //         city_id: '',
// //         state_id: '',
// //         country_id: '',
// //         zipcode: '',
// //         note: '',
// //         openbalance: '',
// //         primarypaymentmethod_id: '',
// //         terms_id: '',
// //         salesfromdeliveryoptions_id: '',
// //         languages_id: '',
// //         customertype_id: '',
// //         salestaxes_id: '', 
// //         status_id: '',
// //         franchiseowner_id: '',
// //         createddate: getIndianStandardTime(),
// //         createdby: '', // To be set to the logged-in username
// //         followedby: '', // To be entered by the user
// //         sameasbilling: true, // Default checkbox is checked
// //     });

// //     const [salesTax, setSalesTax] = useState('');


// //     // Dropdown options state
// //     const [cities, setCities] = useState([]);
// //     const [states, setStates] = useState([]);
// //     const [countries, setCountries] = useState([]);
// //     const [paymentMethods, setPaymentMethods] = useState([]);
// //     const [terms, setTerms] = useState([]);
// //     const [deliveryOptions, setDeliveryOptions] = useState([]);
// //     const [languages, setLanguages] = useState([]);
// //     const [customerTypes, setCustomerTypes] = useState([]);
// //     const [statuses, setStatuses] = useState([]);
// //     const [franchiseOwners, setFranchiseOwners] = useState([]);


// //     // Fetch dropdown data and customer data
// //     useEffect(() => {
// //         fetchDropdownData();
// //         fetchCustomerData();
// //     }, [customerId]);

// //     const fetchCustomerData = async () => {
// //         try {
// //             const response = await axios.post(`http://LAPTOP-LMDOPUS7:8080/customers/customerdetailsbyoneid`,{ id: customerId });
// //             setFormData(response.data); // Populate formData with customer data
// //         } catch (error) {
// //             console.error('Error fetching customer data:', error);
// //         }
// //     };

// //     const fetchDropdownData = async () => {
// //         try {
// //             const responses = await Promise.all([
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/cities/getallcity'),
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/states/getallstates'),
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/countries/getallcountries'),
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/primarypaymentmethods/getprimaryall'),
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/terms/getallterms'),
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/salesfromdeliveryoptions/getsalesall'),
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/languages/getalllanguages'),
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/customertypes/getallcustomertypes'),
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/statuses/getallstatus'),
// //                 axios.post('http://LAPTOP-LMDOPUS7:8080/franchiseowners/getallfranchise'),
// //             ]);

// //             setCities(responses[0].data);
// //             setStates(responses[1].data);
// //             setCountries(responses[2].data);
// //             setPaymentMethods(responses[3].data);
// //             setTerms(responses[4].data);
// //             setDeliveryOptions(responses[5].data);
// //             setLanguages(responses[6].data);
// //             setCustomerTypes(responses[7].data);

// //             setStatuses(responses[9].data);
// //             setFranchiseOwners(responses[10].data);
// //         } catch (error) {
// //             console.error('Error fetching dropdown data:', error);
// //         }
// //     };

// //     // Function to fetch sales tax based on city and state
// //     // Function to fetch sales tax based on city and state
// //     const fetchSalesTax = async (city, state) => {
// //         if (city && state) {
// //             try {
// //                 const response = await axios.post('http://LAPTOP-LMDOPUS7:8080/salestaxes/findsalestax', {
// //                     city,
// //                     state,
// //                 });
// //                 setSalesTax(response.data); // Assuming response.data contains the sales tax value
// //                 setFormData((prev) => ({ ...prev, salestaxes_id: response.data })); // Update formData with sales tax
// //             } catch (error) {
// //                 console.error('Error fetching sales tax:', error);
// //             }
// //         }
// //     };

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;

// //         if (type === 'checkbox') {
// //             setFormData((prev) => ({
// //                 ...prev,
// //                 [name]: checked,
// //                 shippingaddress: checked ? prev.billingaddress : prev.shippingaddress,
// //             }));
// //         } else {
// //             setFormData((prev) => {
// //                 const updatedData = {
// //                     ...prev,
// //                     [name]: value,
// //                     ...(prev.sameasbilling && name === 'billingaddress' && { shippingaddress: value }),
// //                 };

// //                 // Fetch sales tax if city or state is updated
// //                 if (name === 'city_id' || name === 'state_id') {
// //                     fetchSalesTax(updatedData.city_id, updatedData.state_id);
// //                 }

// //                 return updatedData;
// //             });
// //         }
// //     };


// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await axios.post(`http://LAPTOP-LMDOPUS7:8080/customers/updateonlycustomerdetails/${customerId}`, formData);
// //             alert('Customer data updated successfully!');
// //             navigate('/customerinvoicelist'); // Redirect back after successful submission
// //         } catch (error) {
// //             console.error('Error updating customer data:', error);
// //             alert('Error updating customer data.');
// //         }
// //     };

// //     return (
// //         <div className='customer'>
// //             <center>
// //                 <h1>Edit Customer Form</h1>
// //             </center>
// //             <form onSubmit={handleSubmit}>
// //                 <div className='form-section'>
// //                     <h2>Personal Information</h2>
// //                     <div className='form-row'>
// //                         {/* Add inputs for each personal info field */}
// //                         <div className='form-column'>
// //                             <label>Title</label>
// //                             <input type="text" name="title" value={formData.title} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>First Name</label>
// //                             <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Middle Name</label>
// //                             <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Last Name</label>
// //                             <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Suffix</label>
// //                             <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Company Name</label>
// //                             <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Customer Display Name</label>
// //                             <input type="text" name="customerdisplayname" value={formData.customerdisplayname} onChange={handleChange} />
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className='form-section'>
// //                     <h2>Contact Information</h2>
// //                     <div className='form-row'>
// //                         <div className='form-column'>
// //                             <label>Email ID</label>
// //                             <input type="email" name="emailid" value={formData.emailid} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Phone Number</label>
// //                             <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Mobile Number</label>
// //                             <input type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Fax</label>
// //                             <input type="text" name="fax" value={formData.fax} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Other</label>
// //                             <input type="text" name="other" value={formData.other} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Website</label>
// //                             <input type="text" name="website" value={formData.website} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Name to Print on Checks</label>
// //                             <input type="text" name="nametoprintonchecks" value={formData.nametoprintonchecks} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Open Balance</label>
// //                             <input type="text" name="openbalance" value={formData.openbalance} onChange={handleChange} />
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className='form-section'>
// //                     <h2>Address Information</h2>
// //                     <div className='form-row'>
// //                         <div className='form-column'>
// //                             <label>Billing Address</label>
// //                             <input type="text" name="billingaddress" value={formData.billingaddress} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Shipping Address</label>
// //                             <input type="text" name="shippingaddress" value={formData.shippingaddress} onChange={handleChange} disabled={formData.sameasbilling} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>City</label>
// //                             <select name="city_id" value={formData.city_id} onChange={handleChange}>
// //                                 <option value="">Select City</option>
// //                                 {cities.map((city) => (
// //                                     <option key={city.id} value={city.name}>{city.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>State</label>
// //                             <select name="state_id" value={formData.state_id} onChange={handleChange}>
// //                                 <option value="">Select State</option>
// //                                 {states.map((state) => (
// //                                     <option key={state.id} value={state.name}>{state.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Country</label>
// //                             <select name="country_id" value={formData.country_id} onChange={handleChange}>
// //                                 <option value="">Select Country</option>
// //                                 {countries.map((country) => (
// //                                     <option key={country.id} value={country.name}>{country.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Zip Code</label>
// //                             <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
// //                         </div>
// //                     </div>
// //                     <div className='checkbox-label-container'>
// //                         <input type="checkbox" name="sameasbilling" checked={formData.sameasbilling} onChange={handleChange} />
// //                         <label>Shipping address same as billing address</label>
// //                     </div>
// //                 </div>

// //                 <div className='form-section'>
// //                     <h2>Additional Information</h2>
// //                     <div className='form-row'>
// //                         <div className='form-column'>
// //                             <label>Created Date</label>
// //                             <input type="text" name="createddate" value={formData.createddate} readOnly />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Created By</label>
// //                             <input type="text" name="createdby" value={formData.createdby} readOnly />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Follow Up Date</label>
// //                             <input type="date" name="followedby" value={formData.followedby} onChange={handleChange} />
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Notes</label>
// //                             <textarea name="note" value={formData.note} onChange={handleChange}></textarea>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className='form-section'>
// //                     <h2>Preferences</h2>
// //                     <div className='form-row'>
// //                         <div className='form-column'>
// //                             <label>Primary Payment Method</label>
// //                             <select name="primarypaymentmethod_id" value={formData.primarypaymentmethod_id} onChange={handleChange}>
// //                                 <option value="">Select Primary Payment Method</option>
// //                                 {paymentMethods.map((method) => (
// //                                     <option key={method.id} value={method.name}>{method.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Terms</label>
// //                             <select name="terms_id" value={formData.terms_id} onChange={handleChange}>
// //                                 <option value="">Select Terms</option>
// //                                 {terms.map((term) => (
// //                                     <option key={term.id} value={term.name}>{term.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Sales from Delivery Options</label>
// //                             <select name="salesfromdeliveryoptions_id" value={formData.salesfromdeliveryoptions_id} onChange={handleChange}>
// //                                 <option value="">Select Sales from Delivery Options</option>
// //                                 {deliveryOptions.map((option) => (
// //                                     <option key={option.id} value={option.name}>{option.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Language</label>
// //                             <select name="languages_id" value={formData.languages_id} onChange={handleChange}>
// //                                 <option value="">Select Language</option>
// //                                 {languages.map((language) => (
// //                                     <option key={language.id} value={language.name}>{language.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Customer Type</label>
// //                             <select name="customertype_id" value={formData.customertype_id} onChange={handleChange}>
// //                                 <option value="">Select Customer Type</option>
// //                                 {customerTypes.map((type) => (
// //                                     <option key={type.id} value={type.name}>{type.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Sales Tax</label>
// //                             <input type="text" name="salestaxes_id" value={salesTax} readOnly />
// //                         </div>

// //                         <div className='form-column'>
// //                             <label>Status</label>
// //                             <select name="status_id" value={formData.status_id} onChange={handleChange}>
// //                                 <option value="">Select Status</option>
// //                                 {statuses.map((status) => (
// //                                     <option key={status.id} value={status.name}>{status.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className='form-column'>
// //                             <label>Franchise Owner</label>
// //                             <select name="franchiseowner_id" value={formData.franchiseowner_id} onChange={handleChange}>
// //                                 <option value="">Select Franchise Owner</option>
// //                                 {franchiseOwners.map((owner) => (
// //                                     <option key={owner.id} value={owner.name}>{owner.name}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <button type="submit">Submit</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default EditCustomer;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import './CustomerForm.css'; // Ensure you have this CSS file
// import { useParams, useNavigate } from 'react-router-dom';
// import './EditCustomerForm.css';

// const EditCustomer = ({isOpen}) => {
//     const { customerId } = useParams(); // Get customerId from the URL
//     const navigate = useNavigate();

//     // Function to get current IST time using Asia/Kolkata timezone
//     const getIndianStandardTime = () => {
//         const options = {
//             timeZone: 'Asia/Kolkata',
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit',
//             hour12: false,
//         };

//         const formatter = new Intl.DateTimeFormat('en-GB', options);
//         const [
//             { value: day }, ,
//             { value: month }, ,
//             { value: year }, ,
//             { value: hour }, ,
//             { value: minute }, ,
//             { value: second }
//         ] = formatter.formatToParts(new Date());

//         return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
//     };


//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null);
//     // Initialize formData state
//     const [formData, setFormData] = useState({
//         title: '',
//         firstname: '',
//         middlename: '',
//         lastname: '',
//         suffix: '',
//         companyname: '',
//         customerdisplayname: '',
//         emailid: '',
//         phonenumber: '',
//         mobilenumber: '',
//         fax: '',
//         other: '',
//         website: '',
//         nametoprintonchecks: '',
//         billingaddress: '',
//         shippingaddress: '',
//         city_id: '',
//         state_id: '',
//         country_id: '',
//         zipcode: '',
//         note: '',
//         openbalance: '',
//         primarypaymentmethod_id: '',
//         terms_id: '',
//         salesfromdeliveryoptions_id: '',
//         languages_id: '',
//         customertype_id: '',

//         status_id: '',
//         franchiseowner_id: '',
//         createddate: getIndianStandardTime(),
//         createdby: '', // To be set to the logged-in username
//         followedby: '', // To be entered by the user
//         sameasbilling: true, // Default checkbox is checked
//     });

//     const [salesTax, setSalesTax] = useState('');


//     // Dropdown options state
//     const [cities, setCities] = useState([]);
//     const [states, setStates] = useState([]);
//     const [countries, setCountries] = useState([]);
//     const [paymentMethods, setPaymentMethods] = useState([]);
//     const [terms, setTerms] = useState([]);
//     const [deliveryOptions, setDeliveryOptions] = useState([]);
//     const [languages, setLanguages] = useState([]);
//     const [customerTypes, setCustomerTypes] = useState([]);
//     const [statuses, setStatuses] = useState([]);
//     const [franchiseOwners, setFranchiseOwners] = useState([]);


//     // Fetch dropdown data and customer data
//     useEffect(() => {
//         fetchDropdownData();
//         fetchCustomerData();
//     }, [customerId]);

//     const fetchCustomerData = async () => {
//         try {
//             console.log('Fetching customer data for ID:', customerId);
//             const response = await axios.post(
//                 'http://localhost:8080/customers/customerdetailsbyoneid',
//                 { id: customerId } // Send customerId in the request body
//             );
//             setFormData(response.data); // Populate form data
//             setLoading(false);
//         } catch (err) {
//             setError('Failed to fetch customer data: ' + err.message);
//             setLoading(false);
//         }
//     };


//     const fetchDropdownData = async () => {
//         try {
//             const responses = await Promise.all([
//                 axios.post('http://localhost:8080/cities/getallcity'),
//                 axios.post('http://localhost:8080/states/getallstates'),
//                 axios.post('http://localhost:8080/countries/getallcountries'),
//                 axios.post('http://localhost:8080/primarypaymentmethods/getprimaryall'),
//                 axios.post('http://localhost:8080/terms/getallterms'),
//                 axios.post('http://localhost:8080/salesfromdeliveryoptions/getsalesall'),
//                 axios.post('http://localhost:8080/languages/getalllanguages'),
//                 axios.post('http://localhost:8080/customertypes/getallcustomertypes'),
//                 axios.post('http://localhost:8080/statuses/getallstatus'),
//                 axios.post('http://localhost:8080/franchiseowners/getallfranchise'),
//             ]);

//             setCities(responses[0].data);
//             setStates(responses[1].data);
//             setCountries(responses[2].data);
//             setPaymentMethods(responses[3].data);
//             setTerms(responses[4].data);
//             setDeliveryOptions(responses[5].data);
//             setLanguages(responses[6].data);
//             setCustomerTypes(responses[7].data);

//             // Make sure these indices correspond correctly to your API response
//             setStatuses(responses[8].data);
//             setFranchiseOwners(responses[9].data);
//         } catch (error) {
//             console.error('Error fetching dropdown data:', error);
//         }
//     };

//     // Function to fetch sales tax based on city and state
//     // Function to fetch sales tax based on city and state
//     const fetchSalesTax = async (city, state) => {
//         if (city && state) {
//             try {
//                 const response = await axios.post('http://localhost:8080/salestaxes/findsalestax', {
//                     city,
//                     state,
//                 });
//                 setSalesTax(response.data); // Assuming response.data contains the sales tax value
//                 setFormData((prev) => ({ ...prev, salestaxes_id: response.data })); // Update formData with sales tax
//             } catch (error) {
//                 console.error('Error fetching sales tax:', error);
//             }
//         }
//     };


//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         if (type === 'checkbox') {
//             setFormData((prev) => ({
//                 ...prev,
//                 [name]: checked,
//                 shippingaddress: checked ? prev.billingaddress : prev.shippingaddress,
//             }));
//         } else {
//             setFormData((prev) => {
//                 const updatedData = {
//                     ...prev,
//                     [name]: value,
//                     ...(prev.sameasbilling && name === 'billingaddress' && { shippingaddress: value }),
//                 };

//                 // Fetch sales tax if city or state is updated
//                 if (name === 'city_id' || name === 'state_id') {
//                     fetchSalesTax(updatedData.city_id, updatedData.state_id);
//                 }

//                 return updatedData;
//             });
//         }
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`http://localhost:8080/customers/updateonlycustomerdetails/${customerId}`, formData);
//             alert('Customer data updated successfully!');
//             navigate('/customerinvoicelist'); // Redirect back after successful submission
//         } catch (error) {
//             console.error('Error updating customer data:', error);
//             alert('Error updating customer data.');
//         }
//     };



//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;


//     return (
//         <div className={`editcustomer-form ${isOpen ? 'open' : ''}`}>
//             <h1>Edit Customer Form</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className='editcustomer-form-div'>
//                     <h2>Personal Information</h2>
//                     <div className='editcustomer-form-row'>
//                         {/* Add inputs for each personal info field */}
//                         <div className='editcustomer-form-column'>
//                             <label>Title</label>
//                             <input type="text" name="title" value={formData.title} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>First Name</label>
//                             <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Middle Name</label>
//                             <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Last Name</label>
//                             <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Suffix</label>
//                             <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Company Name</label>
//                             <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Customer Display Name</label>
//                             <input type="text" name="customerdisplayname" value={formData.customerdisplayname} onChange={handleChange} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className='editcustomer-form-div'>
//                     <h2>Contact Information</h2>
//                     <div className='editcustomer-form-row'>
//                         <div className='editcustomer-form-column'>
//                             <label>Email ID</label>
//                             <input type="email" name="emailid" value={formData.emailid} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Phone Number</label>
//                             <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Mobile Number</label>
//                             <input type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Fax</label>
//                             <input type="text" name="fax" value={formData.fax} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Other</label>
//                             <input type="text" name="other" value={formData.other} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Website</label>
//                             <input type="text" name="website" value={formData.website} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Name to Print on Checks</label>
//                             <input type="text" name="nametoprintonchecks" value={formData.nametoprintonchecks} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Open Balance</label>
//                             <input type="text" name="openbalance" value={formData.openbalance} onChange={handleChange} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className='editcustomer-form-div'>
//                     <h2>Address Information</h2>
//                     <div className='editcustomer-form-row'>
//                         <div className='editcustomer-form-column'>
//                             <label>Billing Address</label>
//                             <input type="text" name="billingaddress" value={formData.billingaddress} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Shipping Address</label>
//                             <input type="text" name="shippingaddress" value={formData.shippingaddress} onChange={handleChange} disabled={formData.sameasbilling} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>City</label>
//                             <select name="city_id" value={formData.city_id} onChange={handleChange}>
//                                 <option value="">Select City</option>
//                                 {cities.map((city) => (
//                                     <option key={city.id} value={city.name}>{city.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>State</label>
//                             <select name="state_id" value={formData.state_id} onChange={handleChange}>
//                                 <option value="">Select State</option>
//                                 {states.map((state) => (
//                                     <option key={state.id} value={state.name}>{state.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Country</label>
//                             <select name="country_id" value={formData.country_id} onChange={handleChange}>
//                                 <option value="">Select Country</option>
//                                 {countries.map((country) => (
//                                     <option key={country.id} value={country.name}>{country.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Zip Code</label>
//                             <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
//                         </div>
//                     </div>
//                     <div className='editcustomer-form-column'>
//                         <input type="checkbox" name="sameasbilling" checked={formData.sameasbilling} onChange={handleChange} />
//                         <label>Shipping address same as billing address</label>
//                     </div>
//                 </div>

//                 <div className='editcustomer-form-div'>
//                     <h2>Additional Information</h2>
//                     <div className='editcustomer-form-row'>
//                         <div className='editcustomer-form-column'>
//                             <label>Created Date</label>
//                             <input type="text" name="createddate" value={formData.createddate} readOnly />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Created By</label>
//                             <input type="text" name="createdby" value={formData.createdby} readOnly />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Follow Up Date</label>
//                             <input type="date" name="followedby" value={formData.followedby} onChange={handleChange} />
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Notes</label>
//                             <textarea name="note" value={formData.note} onChange={handleChange}></textarea>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='editcustomer-form-div'>
//                     <h2>Preferences</h2>
//                     <div className='editcustomer-form-row'>
//                         <div className='editcustomer-form-column'>
//                             <label>Primary Payment Method</label>
//                             <select name="primarypaymentmethod_id" value={formData.primarypaymentmethod_id} onChange={handleChange}>
//                                 <option value="">Select Primary Payment Method</option>
//                                 {paymentMethods.map((method) => (
//                                     <option key={method.id} value={method.name}>{method.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Terms</label>
//                             <select name="terms_id" value={formData.terms_id} onChange={handleChange}>
//                                 <option value="">Select Terms</option>
//                                 {terms.map((term) => (
//                                     <option key={term.id} value={term.name}>{term.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Sales from Delivery Options</label>
//                             <select name="salesfromdeliveryoptions_id" value={formData.salesfromdeliveryoptions_id} onChange={handleChange}>
//                                 <option value="">Select Sales from Delivery Options</option>
//                                 {deliveryOptions.map((option) => (
//                                     <option key={option.id} value={option.name}>{option.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Language</label>
//                             <select name="languages_id" value={formData.languages_id} onChange={handleChange}>
//                                 <option value="">Select Language</option>
//                                 {languages.map((language) => (
//                                     <option key={language.id} value={language.name}>{language.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Customer Type</label>
//                             <select name="customertype_id" value={formData.customertype_id} onChange={handleChange}>
//                                 <option value="">Select Customer Type</option>
//                                 {customerTypes.map((type) => (
//                                     <option key={type.id} value={type.name}>{type.name}</option>
//                                 ))}
//                             </select>
//                         </div>


//                         <div className='editcustomer-form-column'>
//                             <label>Status</label>
//                             <select name="status_id" value={formData.status_id} onChange={handleChange}>
//                                 <option value="">Select Status</option>
//                                 {statuses.map((status) => (
//                                     <option key={status.id} value={status.name}>{status.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='editcustomer-form-column'>
//                             <label>Franchise Owner</label>
//                             <select name="franchiseowner_id" value={formData.franchiseowner_id} onChange={handleChange}>
//                                 <option value="">Select Franchise Owner</option>
//                                 {franchiseOwners.map((owner) => (
//                                     <option key={owner.id} value={owner.name}>{owner.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='editcustomer-form-button'>
//                     <button type="submit">Submit</button>
//                 </div>

//             </form>
//         </div>
//     );
// };

// export default EditCustomer;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerForm.css'; // Ensure you have this CSS file
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
    const { customerId } = useParams(); // Get customerId from the URL
    const navigate = useNavigate();

    // Function to get current IST time using Asia/Kolkata timezone
    const getIndianStandardTime = () => {
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const [
            { value: day },,
            { value: month },,
            { value: year },,
            { value: hour },,
            { value: minute },,
            { value: second }
        ] = formatter.formatToParts(new Date());

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    };

    
    const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); 
    // Initialize formData state
    const [formData, setFormData] = useState({
        title: '',
        firstname: '',
        middlename: '',
        lastname: '',
        suffix: '',
        companyname: '',
        customerdisplayname: '',
        emailid: '',
        phonenumber: '',
        mobilenumber: '',
        fax: '',
        other: '',
        website: '',
        nametoprintonchecks: '',
        billingaddress: '',
        shippingaddress: '',
        city_id: '',
        state_id: '',
        country_id: '',
        zipcode: '',
        note: '',
        openbalance: '',
        primarypaymentmethod_id: '',
        terms_id: '',
        salesfromdeliveryoptions_id: '',
        languages_id: '',
        customertype_id: '',
       
        status_id: '',
        franchiseowner_id: '',
        createddate: getIndianStandardTime(),
        createdby: '', // To be set to the logged-in username
        followedby: '', // To be entered by the user
        sameasbilling: true, // Default checkbox is checked
    });
    
    const [salesTax, setSalesTax] = useState('');
    

    // Dropdown options state
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [terms, setTerms] = useState([]);
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [customerTypes, setCustomerTypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [franchiseOwners, setFranchiseOwners] = useState([]);
    

    // Fetch dropdown data and customer data
    useEffect(() => {
        fetchDropdownData();
        fetchCustomerData();
    }, [customerId]);

    // const fetchCustomerData = async () => {
    //     try {
    //       console.log('Fetching customer data for ID:', customerId);
    //       const response = await axios.post(
    //         'http://localhost:8080/customers/customerdetailsbyoneid',
    //         { id: customerId } // Send customerId in the request body
    //       );
    //       setFormData(response.data); // Populate form data
    //       setLoading(false);
    //     } catch (err) {
    //       setError('Failed to fetch customer data: ' + err.message);
    //       setLoading(false);
    //     }
    //   };




    const fetchCustomerData = async () => {
        try {
            console.log('Fetching customer data for ID:', customerId);
            const response = await axios.post(
                'http://localhost:8080/customers/customerdetailsbyoneid',
                { id: customerId }
            );
    
            const customer = response.data;
    
            // Map API response to match formData state
            setFormData({
                title: customer.title || '',
                firstname: customer.firstname || '',
                middlename: customer.middlename || '',
                lastname: customer.lastname || '',
                suffix: customer.suffix || '',
                companyname: customer.companyname || '',
                customerdisplayname: customer.customerdisplayname || '',
                emailid: customer.emailid || '',
                phonenumber: customer.phonenumber || '',
                mobilenumber: customer.mobilenumber || '',
                fax: customer.fax || '',
                other: customer.other || '',
                website: customer.website || '',
                nametoprintonchecks: customer.nametoprintonchecks || '',
    
                // Properly mapping address fields
                billingaddress: `${customer.billingstreetaddress || ''}, ${customer.billingplatnumber || ''}`,
                shippingaddress: `${customer.shipingstreetaddress || ''}, ${customer.shipingplatnumber || ''}`,
                
                city_id: customer.billingcity_id || '',
                state_id: customer.billingstate_id || '',
                country_id: customer.billingcountry_id || '',
                zipcode: customer.billingzipcode || '',
    
                note: customer.note || '',
                openbalance: customer.openbalance || '',
                primarypaymentmethod_id: customer.primarypaymentmethod_id || '',
                terms_id: customer.terms_id || '',
                salesfromdeliveryoptions_id: customer.salesfromdeliveryoptions_id || '',
                languages_id: customer.languages_id || '',
                customertype_id: customer.customertype_id || '',
                status_id: customer.status_id || '',
                franchiseowner_id: customer.franchiseowner_id || '',
                createddate: customer.createddate || getIndianStandardTime(),
                createdby: customer.createdby || '',
                followedby: customer.followedby || '',
                sameasbilling: true
            });
    
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch customer data: ' + err.message);
            setLoading(false);
        }
    };
    
    
    
    const fetchDropdownData = async () => {
        try {
            const responses = await Promise.all([
                axios.post('http://localhost:8080/cities/getallcity'),
                axios.post('http://localhost:8080/states/getallstates'),
                axios.post('http://localhost:8080/countries/getallcountries'),
                axios.post('http://localhost:8080/primarypaymentmethods/getprimaryall'),
                axios.post('http://localhost:8080/terms/getallterms'),
                axios.post('http://localhost:8080/salesfromdeliveryoptions/getsalesall'),
                axios.post('http://localhost:8080/languages/getalllanguages'),
                axios.post('http://localhost:8080/customertypes/getallcustomertypes'),
                axios.post('http://localhost:8080/statuses/getallstatus'),
                axios.post('http://localhost:8080/franchiseowners/getallfranchise'),
            ]);
    
            setCities(responses[0].data);
            setStates(responses[1].data);
            setCountries(responses[2].data);
            setPaymentMethods(responses[3].data);
            setTerms(responses[4].data);
            setDeliveryOptions(responses[5].data);
            setLanguages(responses[6].data);
            setCustomerTypes(responses[7].data);
            
            // Make sure these indices correspond correctly to your API response
            setStatuses(responses[8].data);
            setFranchiseOwners(responses[9].data);
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };
    
    // Function to fetch sales tax based on city and state
    // Function to fetch sales tax based on city and state
    const fetchSalesTax = async (city, state) => {
        if (city && state) {
            try {
                const response = await axios.post('http://localhost:8080/salestaxes/findsalestax', {
                    city,
                    state,
                });
                setSalesTax(response.data); // Assuming response.data contains the sales tax value
                setFormData((prev) => ({ ...prev, salestaxes_id: response.data })); // Update formData with sales tax
            } catch (error) {
                console.error('Error fetching sales tax:', error);
            }
        }
    };
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
                shippingaddress: checked ? prev.billingaddress : prev.shippingaddress,
            }));
        } else {
            setFormData((prev) => {
                const updatedData = {
                    ...prev,
                    [name]: value,
                    ...(prev.sameasbilling && name === 'billingaddress' && { shippingaddress: value }),
                };

                // Fetch sales tax if city or state is updated
                if (name === 'city_id' || name === 'state_id') {
                    fetchSalesTax(updatedData.city_id, updatedData.state_id);
                }

                return updatedData;
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/customers/updateonlycustomerdetails/${customerId}`, formData);
            alert('Customer data updated successfully!');
            navigate('/customerinvoicelist'); // Redirect back after successful submission
        } catch (error) {
            console.error('Error updating customer data:', error);
            alert('Error updating customer data.');
        }
    };



    if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


    return (
        <div className='customer'>
            <center>
                <h1>Edit Customer Form</h1>
            </center>
            <form onSubmit={handleSubmit}>
                <div className='form-section'>
                    <h2>Personal Information</h2>
                    <div className='form-row'>
                        {/* Add inputs for each personal info field */}
                        <div className='form-column'>
                            <label>Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>First Name</label>
                            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Middle Name</label>
                            <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Last Name</label>
                            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Suffix</label>
                            <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Company Name</label>
                            <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Customer Display Name</label>
                            <input type="text" name="customerdisplayname" value={formData.customerdisplayname} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className='form-section'>
                    <h2>Contact Information</h2>
                    <div className='form-row'>
                        <div className='form-column'>
                            <label>Email ID</label>
                            <input type="email" name="emailid" value={formData.emailid} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Phone Number</label>
                            <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Mobile Number</label>
                            <input type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Fax</label>
                            <input type="text" name="fax" value={formData.fax} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Other</label>
                            <input type="text" name="other" value={formData.other} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Website</label>
                            <input type="text" name="website" value={formData.website} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Name to Print on Checks</label>
                            <input type="text" name="nametoprintonchecks" value={formData.nametoprintonchecks} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Open Balance</label>
                            <input type="text" name="openbalance" value={formData.openbalance} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className='form-section'>
                    <h2>Address Information</h2>
                    <div className='form-row'>
                        <div className='form-column'>
                            <label>Billing Address</label>
                            <input type="text" name="billingaddress" value={formData.billingaddress} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Shipping Address</label>
                            <input type="text" name="shippingaddress" value={formData.shippingaddress} onChange={handleChange} disabled={formData.sameasbilling} />
                        </div>
                        <div className='form-column'>
                            <label>City</label>
                            <select name="city_id" value={formData.city_id} onChange={handleChange}>
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-column'>
                            <label>State</label>
                            <select name="state_id" value={formData.state_id} onChange={handleChange}>
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.name}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-column'>
                            <label>Country</label>
                            <select name="country_id" value={formData.country_id} onChange={handleChange}>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-column'>
                            <label>Zip Code</label>
                            <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='checkbox-label-container'>
                        <input type="checkbox" name="sameasbilling" checked={formData.sameasbilling} onChange={handleChange} />
                        <label>Shipping address same as billing address</label>
                    </div>
                </div>

                <div className='form-section'>
                    <h2>Additional Information</h2>
                    <div className='form-row'>
                        <div className='form-column'>
                            <label>Created Date</label>
                            <input type="text" name="createddate" value={formData.createddate} readOnly />
                        </div>
                        <div className='form-column'>
                            <label>Created By</label>
                            <input type="text" name="createdby" value={formData.createdby} readOnly />
                        </div>
                        <div className='form-column'>
                            <label>Follow Up Date</label>
                            <input type="date" name="followedby" value={formData.followedby} onChange={handleChange} />
                        </div>
                        <div className='form-column'>
                            <label>Notes</label>
                            <textarea name="note" value={formData.note} onChange={handleChange}></textarea>
                        </div>
                    </div>
                </div>

                <div className='form-section'>
                    <h2>Preferences</h2>
                    <div className='form-row'>
                        <div className='form-column'>
                            <label>Primary Payment Method</label>
                            <select name="primarypaymentmethod_id" value={formData.primarypaymentmethod_id} onChange={handleChange}>
                                <option value="">Select Primary Payment Method</option>
                                {paymentMethods.map((method) => (
                                    <option key={method.id} value={method.name}>{method.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-column'>
                            <label>Terms</label>
                            <select name="terms_id" value={formData.terms_id} onChange={handleChange}>
                                <option value="">Select Terms</option>
                                {terms.map((term) => (
                                    <option key={term.id} value={term.name}>{term.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-column'>
                            <label>Sales from Delivery Options</label>
                            <select name="salesfromdeliveryoptions_id" value={formData.salesfromdeliveryoptions_id} onChange={handleChange}>
                                <option value="">Select Sales from Delivery Options</option>
                                {deliveryOptions.map((option) => (
                                    <option key={option.id} value={option.name}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-column'>
                            <label>Language</label>
                            <select name="languages_id" value={formData.languages_id} onChange={handleChange}>
                                <option value="">Select Language</option>
                                {languages.map((language) => (
                                    <option key={language.id} value={language.name}>{language.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-column'>
                            <label>Customer Type</label>
                            <select name="customertype_id" value={formData.customertype_id} onChange={handleChange}>
                                <option value="">Select Customer Type</option>
                                {customerTypes.map((type) => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                       

                        <div className='form-column'>
                            <label>Status</label>
                            <select name="status_id" value={formData.status_id} onChange={handleChange}>
                                <option value="">Select Status</option>
                                {statuses.map((status) => (
                                    <option key={status.id} value={status.name}>{status.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-column'>
                            <label>Franchise Owner</label>
                            <select name="franchiseowner_id" value={formData.franchiseowner_id} onChange={handleChange}>
                                <option value="">Select Franchise Owner</option>
                                {franchiseOwners.map((owner) => (
                                    <option key={owner.id} value={owner.name}>{owner.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditCustomer;
