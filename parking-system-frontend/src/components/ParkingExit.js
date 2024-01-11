import React, { useState } from 'react';

const ParkingExit = () => {
  const [uniqueCode, setUniqueCode] = useState('');

  const handleExit = async () => {
    try {
      console.log('Attempting to exit with unique code:', uniqueCode);

      const response = await fetch('http://localhost:5000/api/exit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueCode }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Exit successful:', data);

      } else {
        const errorData = await response.json();
        console.error('Exit failed. Response status:', response.status, 'Error:', errorData.error);
   
      }
    } catch (error) {
      console.error('Error during exit:', error);

    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Parking Exit</h2>
      <div className="mb-3">
        <label htmlFor="uniqueCode" className="form-label">Unique Code:</label>
        <input
          type="text"
          id="uniqueCode"
          className="form-control"
          value={uniqueCode}
          onChange={(e) => setUniqueCode(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-danger" onClick={handleExit}>
        Exit
      </button>
    </div>
  );
};

export default ParkingExit;
