
import ResultEntry from './result-entry';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ParkingEntry = () => {
  const [policeNumber, setPoliceNumber] = useState('');
  const navigate = useNavigate(); // Use useNavigate

  const handleEntry = async () => {
    const uniqueCode = uuidv4();
    const entryTime = new Date().toLocaleString();
    const formattedEntryTime = new Date(entryTime).toISOString().slice(0, 19).replace('T', ' ');

    try {
      const response = await fetch('http://localhost:5000/api/entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueCode, entryTime: formattedEntryTime, policeNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Entry successful:', data);

        // Redirect to the result page
        navigate('/result-entry', {
          state: { success: true, data },
        });
      } else {
        const errorData = await response.json();
        console.error('Entry failed. Response status:', response.status, 'Error:', errorData.error);

        // Redirect to the result page with error state
        navigate('/result-entry', {
          state: { success: false },
        });
      }
    } catch (error) {
      console.error('Error during entry:', error);

      // Redirect to the result page with error state
      navigate('/result-entry', {
        state: { success: false },
      });
    }
  };

  return (
    <div>
      <h2>Parking Entry</h2>
      <label>Police Number:</label>
      <input type="text" value={policeNumber} onChange={(e) => setPoliceNumber(e.target.value)} />
      <button type="button" onClick={handleEntry}>Submit</button>

    </div>
  );
};

export default ParkingEntry;
