// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParkingEntry from './components/ParkingEntry';
import ParkingExit from './components/ParkingExit';
import ResultEntry from './components/result-entry';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParkingEntry />} />
        <Route path="/parking-exit" element={<ParkingExit />} />
        <Route path="/result-entry" element={<ResultEntry />} />
        {/* Add routes for other functionalities */}
      </Routes>
    </Router>
  );
};

export default App;
