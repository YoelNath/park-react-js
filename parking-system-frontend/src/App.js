// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParkingEntry from './components/ParkingEntry';
import ParkingExit from './components/ParkingExit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParkingEntry />} />
        <Route path="/parking-exit" element={<ParkingExit />} />
        {/* Add routes for other functionalities */}
      </Routes>
    </Router>
  );
};

export default App;
