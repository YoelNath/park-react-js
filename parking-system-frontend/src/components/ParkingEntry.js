import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ParkingEntry = () => {
  const [policeNumber, setPoliceNumber] = useState('');

  const handleEntry = async () => {
    const uniqueCode = uuidv4();
    const entryTime = new Date().toLocaleString();

    try {
      const response = await fetch('http://localhost:5000/api/entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueCode, entryTime, policeNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Entry successful:', data);
        // Handle success or display relevant information to the user
      } else {
        const errorData = await response.json();
        console.error('Entry failed. Response status:', response.status, 'Error:', errorData.error);
        // Handle failure or display an error message to the user
      }
    } catch (error) {
      console.error('Error during entry:', error);
      // Handle error or display an error message to the user
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
