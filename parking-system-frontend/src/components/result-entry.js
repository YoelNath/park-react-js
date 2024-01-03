// result-entry.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const ResultEntry = () => {
  const location = useLocation(); // Use useLocation to access state

  // Destructure state from location
  const { state: { success, data } } = location;

  return (
    <div className="container mt-5">
      {success ? (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Entry Successful!</h4>
          <p>Unique Code: {data.uniqueCode}</p>
          <p>Entry Time: {data.entryTime}</p>
          <p>Police Number: {data.policeNumber}</p>
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Entry Failed!</h4>
          <p>There was an error processing your entry.</p>
        </div>
      )}
    </div>
  );
};

export default ResultEntry;
