import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ShowNotesForm.css';

const ShowNotesForm = ({isOpen}) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { customerId } = location.state;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.post('http://localhost:8080/notes/displaylistofnotesdetailsbycustomerid', {
          customerId,
        });
        setNotes(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotes();
  }, [customerId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`show-notes ${isOpen ? 'open' : ''}`}>
      <h2>Notes for Customer ID: {customerId}</h2>
      {notes.length > 0 ? (
        <table className='show-notes-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Display Name</th>
              <th>Mobile Number</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.id}</td>
                <td>{note.customerdisplayname_id}</td>
                <td>{note.mobilenumber}</td>
                <td>{note.createdby}</td>
                <td>{note.createddate}</td>
                <td>{note.customerstatus}</td>
                <td>{note.addnotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No notes available for this customer.</p>
      )}
    </div>
  );
};

export default ShowNotesForm;