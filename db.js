// 1. MUST BE LINE 1: Loads variables from your environment
require('dotenv').config();
const mysql = require('mysql2'); 

// 2. Creates a robust connection pool for stable cloud hosting
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306, // Standard MySQL connection port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 3. Export the module so server.js can read it cleanly
module.exports = db;
