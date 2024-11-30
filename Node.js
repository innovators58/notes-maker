const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@krishnafullstack#01',
    database: 'user_system',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Endpoint to validate email
app.post('/validate-email', (req, res) => {
    const email = req.body.email;

    // Check if the email exists in the database
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            // Email found, proceed to login
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
