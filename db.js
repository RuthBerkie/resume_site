// 1. Load the environment variables from your .env file
require('dotenv').config(); 
const mysql = require('mysql2'); // or 'mysql' depending on your package

// 2. Replace hardcoded strings with process.env variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err.stack);
        return;
    }
    console.log("Database connected successfully using env variables!");
});

module.exports = db;
