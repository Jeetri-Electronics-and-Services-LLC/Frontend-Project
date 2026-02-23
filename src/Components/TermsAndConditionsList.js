// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './TermsAndConditionsList.css';

// const TermsAndConditionsList = () => {
//     const [termsList, setTermsList] = useState([]);

//     // Fetch all terms and conditions on component load
//     useEffect(() => {
//         const fetchTerms = async () => {
//             try {
//                 const response = await axios.post('http://localhost:8080/termsandconditions/getalltermsandconditions');
//                 setTermsList(response.data); // Assuming response.data contains the array of terms
//             } catch (error) {
//                 console.error('Error fetching terms and conditions:', error);
//             }
//         };

//         fetchTerms();
//     }, []);

//     // Delete a term by its ID
//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this term?')) {
//             return;
//         }

//         try {
//             await axios.post('http://localhost:8080/termsandconditions/deletetermsandconditions', { id });
//             alert('Term deleted successfully!');
//             // Remove the deleted term from the list
//             setTermsList((prev) => prev.filter((term) => term.id !== id));
//         } catch (error) {
//             console.error('Error deleting term:', error);
//             alert('Failed to delete the term.');
//         }
//     };

//     return (
//         <div className="terms-condition-list-conatiner">
//             <h2>Terms and Conditions List</h2>
//             {termsList.length > 0 ? (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Type</th>
//                             <th>Created Date</th>
//                             <th>Created By</th>
//                             <th>Description</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {termsList.map((term) => (
//                             <tr key={term.id}>
//                                 <td>{term.id}</td>
//                                 <td>{term.type}</td>
//                                 <td>{term.createddate}</td>
//                                 <td>{term.createdby}</td>
//                                 <td>{term.description}</td>
//                                 <td>
//                                     <button onClick={() => handleDelete(term.id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No terms and conditions found.</p>
//             )}
//         </div>
//     );
// };

// export default TermsAndConditionsList;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TermsAndConditionsList.css';

const TermsAndConditionsList = ({isOpen}) => {
    const [termsList, setTermsList] = useState([]);

    // Fetch all terms and conditions on component load
    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const response = await axios.post('http://localhost:8080/termsandconditions/getalltermsandconditions');
                setTermsList(response.data); // Assuming response.data contains the array of terms
            } catch (error) {
                console.error('Error fetching terms and conditions:', error);
            }
        };

        fetchTerms();
    }, []);

    // Delete a term by its ID
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this term?')) {
            return;
        }

        try {
            await axios.post('http://localhost:8080/termsandconditions/deletetermsandconditions', { id });
            alert('Term deleted successfully!');
            // Remove the deleted term from the list
            setTermsList((prev) => prev.filter((term) => term.id !== id));
        } catch (error) {
            console.error('Error deleting term:', error);
            alert('Failed to delete the term.');
        }
    };

    return (
        <div className={`terms-condition-list-conatiner ${isOpen ? 'open' : ''}`}>
            <h2>Terms and Conditions List</h2>
            {termsList.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Created Date</th>
                            <th>Created By</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {termsList.map((term) => (
                            <tr key={term.id}>
                                <td>{term.id}</td>
                                <td>{term.type}</td>
                                <td>{term.createddate}</td>
                                <td>{term.createdby}</td>
                                <td>{term.description}</td>
                                <td>
                                    <button onClick={() => handleDelete(term.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No terms and conditions found.</p>
            )}
        </div>
    );
};

export default TermsAndConditionsList;