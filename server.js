const express = require('express');
const sql = require('mssql');

const app = express();
const port = 5000;

// Database configuration
const dbConfig = {
    user: 'sharath',
    password: 'chinna@123',
    server: '192.168.1.15',
    database: 'practive',
    options: {
        encrypt: false, 
        trustServerCertificate: true 
    }
};

// Function to get data from SQL Server
async function getData() {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query`SELECT * FROM users`;
        return result.recordset;
    } catch (err) {
        console.error(err);
    }
}

// API endpoint to get user data
app.get('/api/users', async (req, res) => {
    const data = await getData();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
