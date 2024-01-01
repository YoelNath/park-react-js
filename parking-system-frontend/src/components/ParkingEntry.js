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
    <div className="container mt-4">
      <h2 className="mb-4">Parking Entry</h2>
      <div className="mb-3">
        <label htmlFor="policeNumber" className="form-label">Police Number:</label>
        <input
          type="text"
          id="policeNumber"
          className="form-control"
          value={policeNumber}
          onChange={(e) => setPoliceNumber(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleEntry}>
        Submit
      </button>
    </div>
  );
};

export default ParkingEntry;
