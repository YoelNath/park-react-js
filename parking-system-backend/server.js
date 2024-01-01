const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'parking_entries',
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Handle parking exit
app.post('/api/exit', async (req, res) => {
  const { uniqueCode } = req.body;
  console.log('Received unique code for exit:', uniqueCode);

  try {
    // Validate unique code (dummy logic for demonstration)
    if (validateUniqueCode(uniqueCode)) {
      // Implement logic to calculate fee, record exit time, etc.
      const exitTime = new Date().toLocaleString();
      const parkingFee = calculateParkingFee();

      // For simplicity, just logging for now
      console.log(`Exit successful. Exit Time: ${exitTime}, Parking Fee: ${parkingFee}`);

      // Send success response
      res.status(200).json({ success: true, exitTime, parkingFee });
    } else {
      console.error('Invalid unique code for exit');
      // Send error response for invalid unique code
      res.status(400).json({ success: false, error: 'Invalid unique code' });
    }
  } catch (error) {
    console.error('Error during exit:', error);
    // Send error response for internal server error
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Dummy function to validate unique code (replace with actual validation logic)
const validateUniqueCode = (code) => {
  // Example: Check if the code exists in the database or follows a specific format
  return true;
};

// Dummy function to calculate parking fee (replace with actual fee calculation logic)
const calculateParkingFee = () => {
  // Example: Calculate fee based on entry and exit times
  return 3000; // Flat fee of Rp 3000/hour (dummy value for demonstration)
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
