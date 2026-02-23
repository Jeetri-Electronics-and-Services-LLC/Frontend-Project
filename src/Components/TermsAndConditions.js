// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './TermsAndConditions.css';

// const AddTermsAndConditionsForm = () => {
//     const [formData, setFormData] = useState({
//         type: 'Electronics', 
//         createddate: '', 
//         createdby: '', 
//         description: '', 
//     });

//     useEffect(() => {
       
//         const today = new Date().toISOString().split('T')[0]; 
//         const username = localStorage.getItem('username') || 'default'; 
//         setFormData((prev) => ({
//             ...prev,
//             createddate: today,
//             createdby: username,
//         }));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/termsandconditions/addtermsandconditions', formData);
//             alert('Data saved successfully!');
//             console.log('Response:', response.data);
//         } catch (error) {
//             console.error('Error saving data:', error);
//             alert('Failed to save data.');
//         }
//     };

//     return (
//         <div className="terms-conditions-container">
//             <h2>Add Terms and Conditions</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className='terms-conditions-div'>
//                     <label>Type:</label>
//                     <input
//                         type="text"
//                         name="type"
//                         value={formData.type}
//                         onChange={handleChange}
//                         readOnly 
//                     />
//                 </div>
//                 <div className='terms-conditions-div'>
//                     <label>Created Date:</label>
//                     <input
//                         type="date"
//                         name="createddate"
//                         value={formData.createddate}
//                         onChange={handleChange}
//                         readOnly 
//                     />
//                 </div>
//                 <div className='terms-conditions-div'>
//                     <label>Created By:</label>
//                     <input
//                         type="text"
//                         name="createdby"
//                         value={formData.createdby}
//                         onChange={handleChange}
//                         readOnly 
//                     />
//                 </div>
//                 <div className='terms-conditions-div'>
//                     <label>Description:</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         placeholder="Enter description here"
//                         required
//                     />
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default AddTermsAndConditionsForm;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TermsAndConditions.css';

const AddTermsAndConditionsForm = () => {
    const [formData, setFormData] = useState({
        type: 'Electronics', // Default value
        createddate: '', // Will be set to today's date
        createdby: '', // Will be set to the username
        description: '', // User input
    });

    useEffect(() => {
        // Set default values for createddate and createdby
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        const username = localStorage.getItem('username') || 'default'; // Fetch from local storage or set a default
        setFormData((prev) => ({
            ...prev,
            createddate: today,
            createdby: username,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/termsandconditions/addtermsandconditions', formData);
            alert('Data saved successfully!');
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to save data.');
        }
    };

    return (
        <div className="terms-conditions-container">
            <h2>Add Terms and Conditions</h2>
            <form onSubmit={handleSubmit}>
                <div className='terms-conditions-div'>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        readOnly // Default value, not editable
                    />
                </div>
                <div className='terms-conditions-div'>
                    <label>Created Date:</label>
                    <input
                        type="date"
                        name="createddate"
                        value={formData.createddate}
                        onChange={handleChange}
                        readOnly // Default value, not editable
                    />
                </div>
                <div className='terms-conditions-div'>
                    <label>Created By:</label>
                    <input
                        type="text"
                        name="createdby"
                        value={formData.createdby}
                        onChange={handleChange}
                        readOnly // Default value, not editable
                    />
                </div>
                <div className='terms-conditions-div'>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description here"
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddTermsAndConditionsForm;