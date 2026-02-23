// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CustomerForm.css'; // Ensure you have this CSS file

// const CustomerForm = () => {
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
//         billingstreetaddress: '',
//         billingplatnumber:'',
//         billingcity_id: '',
//         billingstate_id: '',
//         billingcountry_id: '',
//         billingzipcode: '',
//         shipingstreetaddress: '',
//         shipingplatnumber: '',
//         shipingcity_id: '',
//         shipingstate_id: '',
//         shipingcountry_id: '',
//         shipingzipcode: '',
//         note: '',
//         openbalance: '',
//         primarypaymentmethod_id: '',
//         terms_id: '',
//         salesfromdeliveryoptions_id: '',
//         languages_id: '',
//         customertype_id: '',

//         status_id: '',
//         franchiseowner_id: '',
//         createddate: getIndianStandardTime(), // Default to current IST date and time
//         createdby: '', // To be set to the logged-in username
//         followedby: '', // To be entered by the user
//         sameasbilling: true, // Default checkbox is checked
//     });


//     // Reset form function
//     const resetForm = () => {
//         setFormData({
//             title: '',
//             firstname: '',
//             middlename: '',
//             lastname: '',
//             suffix: '',
//             companyname: '',
//             customerdisplayname: '',
//             emailid: '',
//             phonenumber: '',
//             mobilenumber: '',
//             fax: '',
//             other: '',
//             website: '',
//             nametoprintonchecks: '',
//             billingstreetaddress: '',
//             billingplatnumber:'',
//             billingcity_id: '',
//             billingstate_id: '',
//             billingcountry_id: '',
//             billingzipcode: '',
//             shipingstreetaddress: '',
//             shipingplatnumber: '',
//             shipingcity_id: '',
//             shipingstate_id: '',
//             shipingcountry_id: '',
//             shipingzipcode: '',
//             note: '',
//             openbalance: '',
//             primarypaymentmethod_id: '',
//             terms_id: '',
//             salesfromdeliveryoptions_id: '',
//             languages_id: '',
//             customertype_id: '',

//             status_id: '',
//             franchiseowner_id: '',
//             createddate: getIndianStandardTime(), // Reset to current IST date and time
//             createdby: localStorage.getItem('username') || '', // Reset to the logged-in user
//             followedby: '',
//             sameasbilling: true,
//         });

//     };

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

//     useEffect(() => {
//         fetchDropdownData();
//         const currentUser = localStorage.getItem('username');
//         setFormData((prev) => ({ ...prev, createdby: currentUser || '' }));
//     }, []);

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
//             setStatuses(responses[8].data);
//             setFranchiseOwners(responses[9].data);
//         } catch (error) {
//             console.error('Error fetching dropdown data:', error);
//         }
//     };





//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         setFormData((prev) => {
//             if (type === 'checkbox' && name === 'sameasbilling') {
//                 return {
//                     ...prev,
//                     [name]: checked,
//                     ...(checked
//                         ? {
//                               shipingstreetaddress: prev.billingstreetaddress,
//                               shipingplatnumber: prev.billingplatnumber,
//                               shipingcity_id: prev.billingcity_id,
//                               shipingstate_id: prev.billingstate_id,
//                               shipingcountry_id: prev.billingcountry_id,
//                               shipingzipcode: prev.billingzipcode,
//                           }
//                         : {
//                               shipingstreetaddress: '',
//                               shipingplatnumber: '',
//                               shipingcity_id: '',
//                               shipingstate_id: '',
//                               shipingcountry_id: '',
//                               shipingzipcode: '',
//                           }),
//                 };
//             }
//             return { ...prev, [name]: value };
//         });
//     };

//     useEffect(() => {
//         if (formData.sameasbilling) {
//             setFormData((prev) => ({
//                 ...prev,
//                 shipingstreetaddress: prev.billingstreetaddress,
//                 shipingplatnumber: prev.billingplatnumber,
//                 shipingcity_id: prev.billingcity_id,
//                 shipingstate_id: prev.billingstate_id,
//                 shipingcountry_id: prev.billingcountry_id,
//                 shipingzipcode: prev.billingzipcode,
//             }));
//         }
//     }, [
//         formData.billingstreetaddress,
//         formData.billingplatnumber,
//         formData.billingcity_id,
//         formData.billingstate_id,
//         formData.billingcountry_id,
//         formData.billingzipcode,
//         formData.sameasbilling,
//     ]);




//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log('Form data being submitted:', formData); // Debug log
//         try {
//             await axios.post('http://localhost:8080/customers/addcustomer', formData);
//             alert('Customer data saved successfully!');
//             resetForm();
//         } catch (error) {
//             console.error('Error saving customer data:', error);
//             alert('Error saving customer data.');
//         }
//     };


//     return (

//             <form onSubmit={handleSubmit}>
//                 <h1>New Customer Form</h1>

//                 {/* Personal Information */}
//                 <label>Title</label>
//                 <input type="text" name="title" value={formData.title} onChange={handleChange} />

//                 <label>First Name</label>
//                 <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />

//                 <label>Middle Name</label>
//                 <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} />

//                 <label>Last Name</label>
//                 <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />

//                 <label>Suffix</label>
//                 <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} />

//                 <label>Company Name</label>
//                 <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} />

//                 <label>Customer Display Name</label>
//                 <input type="text" name="customerdisplayname" value={formData.customerdisplayname} onChange={handleChange} />

//                 {/* Contact Information */}
//                 <label>Email ID</label>
//                 <input type="email" name="emailid" value={formData.emailid} onChange={handleChange} />

//                 <label>Phone Number</label>
//                 <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />

//                 <label>Mobile Number</label>
//                 <input type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} />

//                 <label>Fax</label>
//                 <input type="text" name="fax" value={formData.fax} onChange={handleChange} />

//                 <label>Other</label>
//                 <input type="text" name="other" value={formData.other} onChange={handleChange} />

//                 <label>Website</label>
//                 <input type="text" name="website" value={formData.website} onChange={handleChange} />

//                 <label>Name to Print on Checks</label>
//                 <input type="text" name="nametoprintonchecks" value={formData.nametoprintonchecks} onChange={handleChange} />

//                 {/* Billing Information */}
//                 <label>Billing Street Address</label>
//                 <input type="text" name="billingstreetaddress" value={formData.billingstreetaddress} onChange={handleChange} />

//                 <label>Billing Plat Number</label>
//                 <input type="text" name="billingplatnumber" value={formData.billingplatnumber} onChange={handleChange} />

//                 <label>Billing City</label>
//                 <select name="billingcity_id" value={formData.billingcity_id} onChange={handleChange}>
//                     <option value="">Select City</option>
//                     {cities.map((city) => (
//                         <option key={city.id} value={city.name}>
//                             {city.name}
//                         </option>
//                     ))}
//                 </select>

//                 <label>Billing State</label>
//                 <select name="billingstate_id" value={formData.billingstate_id} onChange={handleChange}>
//                     <option value="">Select State</option>
//                     {states.map((state) => (
//                         <option key={state.id} value={state.name}>
//                             {state.name}
//                         </option>
//                     ))}
//                 </select>

//                 <label>Billing Country</label>
//                 <select name="billingcountry_id" value={formData.billingcountry_id} onChange={handleChange}>
//                     <option value="">Select Country</option>
//                     {countries.map((country) => (
//                         <option key={country.id} value={country.name}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>

//                 <label>Billing Zip Code</label>
//                 <input type="text" name="billingzipcode" value={formData.billingzipcode} onChange={handleChange} />

//                 {/* Shipping Information */}
//                 <label>
//                     <input
//                         type="checkbox"
//                         name="sameasbilling"
//                         checked={formData.sameasbilling}
//                         onChange={handleChange}
//                     />
//                     Shipping address same as billing
//                 </label>

//                 {!formData.sameasbilling && (
//                     <>
//                         <label>Shipping Street Address</label>
//                         <input type="text" name="shipingstreetaddress" value={formData.shipingstreetaddress} onChange={handleChange} />

//                         <label>Shipping Plat Number</label>
//                         <input type="text" name="shipingplatnumber" value={formData.shipingplatnumber} onChange={handleChange} />

//                         <label>Shipping City</label>
//                         <select name="shipingcity_id" value={formData.shipingcity_id} onChange={handleChange}>
//                             <option value="">Select City</option>
//                             {cities.map((city) => (
//                                 <option key={city.id} value={city.name}>
//                                     {city.name}
//                                 </option>
//                             ))}
//                         </select>

//                         <label>Shipping State</label>
//                         <select name="shipingstate_id" value={formData.shipingstate_id} onChange={handleChange}>
//                             <option value="">Select State</option>
//                             {states.map((state) => (
//                                 <option key={state.id} value={state.name}>
//                                     {state.name}
//                                 </option>
//                             ))}
//                         </select>

//                         <label>Shipping Country</label>
//                         <select name="shipingcountry_id" value={formData.shipingcountry_id} onChange={handleChange}>
//                             <option value="">Select Country</option>
//                             {countries.map((country) => (
//                                 <option key={country.id} value={country.name}>
//                                     {country.name}
//                                 </option>
//                             ))}
//                         </select>

//                         <label>Shipping Zip Code</label>
//                         <input type="text" name="shipingzipcode" value={formData.shipingzipcode} onChange={handleChange} />
//                     </>
//                 )}

//                 {/* Additional Information */}
//                 <label>Notes</label>
//                 <textarea name="note" value={formData.note} onChange={handleChange}></textarea>

//                 <label>Open Balance</label>
//                 <input type="text" name="openbalance" value={formData.openbalance} onChange={handleChange} />

//                 <label>Created Date</label>
//                 <input type="text" name="createddate" value={formData.createddate} readOnly />

//                 <label>Created By</label>
//                 <input type="text" name="createdby" value={formData.createdby} readOnly />

//                 <label>Follow Up Date</label>
//                 <input type="date" name="followedby" value={formData.followedby} onChange={handleChange} />


//                 <div className='form-section'>
//                     <h2>Preferences</h2>
//                     <div className='form-row'>


//                         <div className='form-column'>
//                             <label>Primary Payment Method</label>
//                             <select name="primarypaymentmethod_id" value={formData.primarypaymentmethod_id} onChange={handleChange}>
//                                 <option value="">Select Primary Payment Method</option>
//                                 {paymentMethods.map((method) => (
//                                     <option key={method.id} value={method.name}>{method.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='form-column'>
//                             <label>Terms</label>
//                             <select name="terms_id" value={formData.terms_id} onChange={handleChange}>
//                                 <option value="">Select Terms</option>
//                                 {terms.map((term) => (
//                                     <option key={term.id} value={term.name}>{term.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='form-column'>
//                             <label>Sales from Delivery Options</label>
//                             <select name="salesfromdeliveryoptions_id" value={formData.salesfromdeliveryoptions_id} onChange={handleChange}>
//                                 <option value="">Select Sales from Delivery Options</option>
//                                 {deliveryOptions.map((option) => (
//                                     <option key={option.id} value={option.name}>{option.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='form-column'>
//                             <label>Language</label>
//                             <select name="languages_id" value={formData.languages_id} onChange={handleChange}>
//                                 <option value="">Select Language</option>
//                                 {languages.map((language) => (
//                                     <option key={language.id} value={language.name}>{language.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='form-column'>
//                             <label>Customer Type</label>
//                             <select name="customertype_id" value={formData.customertype_id} onChange={handleChange}>
//                                 <option value="">Select Customer Type</option>
//                                 {customerTypes.map((type) => (
//                                     <option key={type.id} value={type.name}>{type.name}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className='form-column'>
//                             <label>Status</label>
//                             <select name="status_id" value={formData.status_id} onChange={handleChange}>
//                                 <option value="">Select Status</option>
//                                 {statuses.map((status) => (
//                                     <option key={status.id} value={status.name}>{status.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className='form-column'>
//                             <label>Franchise Owner</label>
//                             <select name="franchiseowner_id" value={formData.franchiseowner_id} onChange={handleChange}>
//                                 <option value="">Select Franchise Owner</option>
//                                 {franchiseOwners.map((owner) => (
//                                     <option key={owner.id} value={owner.name}>{owner.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                     </div>

//                 <button type="submit">Save Customer</button>
//             </form>
//         );

// };

// export default CustomerForm;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerForm.css'; // Ensure you have this CSS file

const CustomerForm = ({ isOpen }) => {
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
            { value: day }, ,
            { value: month }, ,
            { value: year }, ,
            { value: hour }, ,
            { value: minute }, ,
            { value: second }
        ] = formatter.formatToParts(new Date());

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    };

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
        billingstreetaddress: '',
        billingplatnumber: '',
        billingcity_id: '',
        billingstate_id: '',
        billingcountry_id: '',
        billingzipcode: '',
        shipingstreetaddress: '',
        shipingplatnumber: '',
        shipingcity_id: '',
        shipingstate_id: '',
        shipingcountry_id: '',
        shipingzipcode: '',
        note: '',
        openbalance: '',
        primarypaymentmethod_id: '',
        terms_id: '',
        salesfromdeliveryoptions_id: '',
        languages_id: '',
        customertype_id: '',

        status_id: '',
        franchiseowner_id: '',
        createddate: getIndianStandardTime(), // Default to current IST date and time
        createdby: '', // To be set to the logged-in username
        followedby: '', // To be entered by the user
        sameasbilling: true, // Default checkbox is checked
    });


    // Reset form function
    const resetForm = () => {
        setFormData({
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
            billingstreetaddress: '',
            billingplatnumber: '',
            billingcity_id: '',
            billingstate_id: '',
            billingcountry_id: '',
            billingzipcode: '',
            shipingstreetaddress: '',
            shipingplatnumber: '',
            shipingcity_id: '',
            shipingstate_id: '',
            shipingcountry_id: '',
            shipingzipcode: '',
            note: '',
            openbalance: '',
            primarypaymentmethod_id: '',
            terms_id: '',
            salesfromdeliveryoptions_id: '',
            languages_id: '',
            customertype_id: '',

            status_id: '',
            franchiseowner_id: '',
            createddate: getIndianStandardTime(), // Reset to current IST date and time
            createdby: localStorage.getItem('username') || '', // Reset to the logged-in user
            followedby: '',
            sameasbilling: true,
        });

    };

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

    useEffect(() => {
        fetchDropdownData();
        const currentUser = localStorage.getItem('username');
        setFormData((prev) => ({ ...prev, createdby: currentUser || '' }));
    }, []);

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
            setStatuses(responses[8].data);
            setFranchiseOwners(responses[9].data);
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };





    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            if (type === 'checkbox' && name === 'sameasbilling') {
                return {
                    ...prev,
                    [name]: checked,
                    ...(checked
                        ? {
                            shipingstreetaddress: prev.billingstreetaddress,
                            shipingplatnumber: prev.billingplatnumber,
                            shipingcity_id: prev.billingcity_id,
                            shipingstate_id: prev.billingstate_id,
                            shipingcountry_id: prev.billingcountry_id,
                            shipingzipcode: prev.billingzipcode,
                        }
                        : {
                            shipingstreetaddress: '',
                            shipingplatnumber: '',
                            shipingcity_id: '',
                            shipingstate_id: '',
                            shipingcountry_id: '',
                            shipingzipcode: '',
                        }),
                };
            }
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        if (formData.sameasbilling) {
            setFormData((prev) => ({
                ...prev,
                shipingstreetaddress: prev.billingstreetaddress,
                shipingplatnumber: prev.billingplatnumber,
                shipingcity_id: prev.billingcity_id,
                shipingstate_id: prev.billingstate_id,
                shipingcountry_id: prev.billingcountry_id,
                shipingzipcode: prev.billingzipcode,
            }));
        }
    }, [
        formData.billingstreetaddress,
        formData.billingplatnumber,
        formData.billingcity_id,
        formData.billingstate_id,
        formData.billingcountry_id,
        formData.billingzipcode,
        formData.sameasbilling,
    ]);




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data being submitted:', formData); // Debug log
        try {
            await axios.post('http://localhost:8080/customers/addcustomer', formData);
            alert('Customer data saved successfully!');
            resetForm();
        } catch (error) {
            console.error('Error saving customer data:', error);
            alert('Error saving customer data.');
        }
    };


    return (

        <form  className={`customer-form ${isOpen ? 'open' :''}`} onSubmit={handleSubmit} >
            <h1>New Customer Form</h1>

            <div className="form-group-customer">
                <h2>Personal Information</h2>
                <div className="form-row">
                    <div className="form-column-customer">
                        <label>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>First Name</label>
                        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Middle Name</label>
                        <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Last Name</label>
                        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Suffix</label>
                        <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Company Name</label>
                        <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Customer Display Name</label>
                        <input type="text" name="customerdisplayname" value={formData.customerdisplayname} onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="form-group-customer">
                <h2>Contact Information</h2>
                <div className="form-row">
                    <div className="form-column-customer">
                        <label>Email ID</label>
                        <input type="email" name="emailid" value={formData.emailid} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Phone Number</label>
                        <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Mobile Number</label>
                        <input type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Fax</label>
                        <input type="text" name="fax" value={formData.fax} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Other</label>
                        <input type="text" name="other" value={formData.other} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Website</label>
                        <input type="text" name="website" value={formData.website} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Name to Print on Checks</label>
                        <input type="text" name="nametoprintonchecks" value={formData.nametoprintonchecks} onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="form-group-customer">
                <h2>Billing Information</h2>
                <div className="form-row">
                    <div className="form-column-customer">
                        <label>Billing Street Address</label>
                        <input type="text" name="billingstreetaddress" value={formData.billingstreetaddress} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Billing Plat Number</label>
                        <input type="text" name="billingplatnumber" value={formData.billingplatnumber} onChange={handleChange} />
                    </div>
                    <div className="form-column-customer">
                        <label>Billing City</label>
                        <select name="billingcity_id" value={formData.billingcity_id} onChange={handleChange}>
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-column-customer">
                        <label>Billing State</label>
                        <select name="billingstate_id" value={formData.billingstate_id} onChange={handleChange}>
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state.id} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-column-customer">
                        <label>Billing Country</label>
                        <select name="billingcountry_id" value={formData.billingcountry_id} onChange={handleChange}>
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.name}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-column-customer">
                        <label>Billing Zip Code</label>
                        <input type="text" name="billingzipcode" value={formData.billingzipcode} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-column-customer">
                        <label>
                            <input
                                type="checkbox"
                                name="sameasbilling"
                                checked={formData.sameasbilling}
                                onChange={handleChange}
                            />
                            Shipping address same as billing
                        </label>
                    </div>
                </div>

                {!formData.sameasbilling && (
                    <div className="form-row">
                        <div className="form-column-customer">
                            <label>Shipping Street Address</label>
                            <input type="text" name="shipingstreetaddress" value={formData.shipingstreetaddress} onChange={handleChange} />
                        </div>
                        <div className="form-column-customer">
                            <label>Shipping Plat Number</label>
                            <input type="text" name="shipingplatnumber" value={formData.shipingplatnumber} onChange={handleChange} />
                        </div>
                        <div className="form-column-customer">
                            <label>Shipping City</label>
                            <select name="shipingcity_id" value={formData.shipingcity_id} onChange={handleChange}>
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-column-customer">
                            <label>Shipping State</label>
                            <select name="shipingstate_id" value={formData.shipingstate_id} onChange={handleChange}>
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.name}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-column-customer">
                            <label>Shipping Country</label>
                            <select name="shipingcountry_id" value={formData.shipingcountry_id} onChange={handleChange}>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-column-customer">
                            <label>Shipping Zip Code</label>
                            <input type="text" name="shipingzipcode" value={formData.shipingzipcode} onChange={handleChange} />
                        </div>
                    </div>
                )}
            </div>

            <div className="form-group-customer">
                <h2>Additional Information</h2>
                <div className="form-row">
                    <div className="form-column-customer">
                        <label>Notes</label>
                        <textarea name="note" value={formData.note} onChange={handleChange}></textarea>
                    </div>
                    {/* <div className="form-column-customer">
                <label>Open Balance</label>
                <input type="text" name="openbalance" value={formData.openbalance} onChange={handleChange} />
            </div> */}
                    {/* <div className="form-column-customer">
                <label>Created Date</label>
                <input type="text" name="createddate" value={formData.createddate} readOnly />
            </div>
            <div className="form-column-customer">
                <label>Created By</label>
                <input type="text" name="createdby" value={formData.createdby} readOnly />
            </div> */}
                    <div className="form-column-customer">
                        <label>Follow Up Date</label>
                        <input type="date" name="followedby" value={formData.followedby} onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="form-group-customer">
                <h2>Preferences</h2>
                <div className='form-row'>


                    <div className='form-column-customer'>
                        <label>Primary Payment Method</label>
                        <select name="primarypaymentmethod_id" value={formData.primarypaymentmethod_id} onChange={handleChange}>
                            <option value="">Select Primary Payment Method</option>
                            {paymentMethods.map((method) => (
                                <option key={method.id} value={method.name}>{method.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-column-customer'>
                        <label>Terms</label>
                        <select name="terms_id" value={formData.terms_id} onChange={handleChange}>
                            <option value="">Select Terms</option>
                            {terms.map((term) => (
                                <option key={term.id} value={term.name}>{term.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-column-customer'>
                        <label>Sales from Delivery Options</label>
                        <select name="salesfromdeliveryoptions_id" value={formData.salesfromdeliveryoptions_id} onChange={handleChange}>
                            <option value="">Select Sales from Delivery Options</option>
                            {deliveryOptions.map((option) => (
                                <option key={option.id} value={option.name}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-column-customer'>
                        <label>Language</label>
                        <select name="languages_id" value={formData.languages_id} onChange={handleChange}>
                            <option value="">Select Language</option>
                            {languages.map((language) => (
                                <option key={language.id} value={language.name}>{language.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-column-customer'>
                        <label>Customer Type</label>
                        <select name="customertype_id" value={formData.customertype_id} onChange={handleChange}>
                            <option value="">Select Customer Type</option>
                            {customerTypes.map((type) => (
                                <option key={type.id} value={type.name}>{type.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='form-column-customer'>
                        <label>Status</label>
                        <select name="status_id" value={formData.status_id} onChange={handleChange}>
                            <option value="">Select Status</option>
                            {statuses.map((status) => (
                                <option key={status.id} value={status.name}>{status.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-column-customer'>
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



            <div className="form-buttons">
                <button type="submit">Submit</button>
            </div>
        </form>



    );

};

export default CustomerForm;







