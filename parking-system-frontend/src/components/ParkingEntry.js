import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ParkingEntry = () => {
  const [policeNumber, setPoliceNumber] = useState('');

  const handleEntry = () => {
    const uniqueCode = uuidv4();
    const entryTime = new Date().toLocaleString();

    // Add logic to record the entry in your application
    console.log(`Car with police number ${policeNumber} entered the parking lot.`);
    console.log(`Unique Code: ${uniqueCode}`);
    console.log(`Entry Time: ${entryTime}`);
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
