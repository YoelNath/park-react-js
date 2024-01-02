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

// Handle parking entry
app.post('/api/entry', (req, res) => {

  const { uniqueCode } = req.body;
  const { entryTime} = req.body;
  const { policeNumber } = req.body;
  try {
    // Insert entry data into the database
    db.query(
      'INSERT INTO parking_entries (unique_code, entry_time, police_number) VALUES (?, ?, ?)',
      [uniqueCode, entryTime, policeNumber],
      (error, results) => {
        if (error) {
          console.error('Error inserting entry data:', error);
          res.status(500).json({ success: false, error: 'Internal Server Error' },results);
        } else {
          console.log('Entry data inserted successfully.');
          res.status(201).json({ success: true, uniqueCode, entryTime, policeNumber});
        }
      }
    );
  } catch (error) {
    console.error('Error during entry:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Handle parking exit
app.post('/api/exit', async (req, res) => {
  const { uniqueCode } = req.body;
  console.log('Received unique code for exit:', uniqueCode);

  try {
    // Validate unique code (dummy logic for demonstration)
// Validate unique code (dummy logic for demonstration)
validateUniqueCode(uniqueCode, (codeExists) => {
  if (codeExists) {
    // Implement logic to calculate fee, record exit time, etc.
    const exitTime = new Date().toLocaleString();
    const parkingFee = calculateParkingFee();

    // Insert exit data into the database
    db.query(
      'UPDATE parking_entries SET exit_time = ?, parking_fee = ? WHERE unique_code = ?',
      [exitTime, parkingFee, uniqueCode],
      (error, results) => {
        if (error) {
          console.error('Error updating exit data:', error);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
          console.log('Exit data updated successfully.');
          // Send success response
          res.status(200).json({ success: true, exitTime, parkingFee });
        }
      }
    );
  } else {
    console.error('Invalid unique code for exit');
    // Send error response for invalid unique code
    res.status(400).json({ success: false, error: 'Invalid unique code' });
  }
});

  } catch (error) {
    console.error('Error during exit:', error);
    // Send error response for internal server error
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Dummy function to validate unique code (replace with actual validation logic)
// Dummy function to validate unique code (replace with actual validation logic)
const validateUniqueCode = (code, callback) => {
  // Example: Check if the code exists in the database
  db.query('SELECT * FROM parking_entries WHERE unique_code = ?', [code], (error, results) => {
    if (error) {
      console.error('Error checking unique code:', error);
      callback(false);
    } else {
      // Check if there is any result (code exists in the database)
      const codeExists = results.length > 0;
      callback(codeExists);
    }
  });
};

// Dummy function to calculate parking fee (replace with actual fee calculation logic)
const calculateParkingFee = () => {
  // Example: Calculate fee based on entry and exit times
  return 3000; // Flat fee of Rp 3000/hour (dummy value for demonstration)
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
