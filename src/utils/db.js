//db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10, // Adjust as needed
});

module.exports = pool;


// const mysql = require('mysql');
// const dotenv = require('dotenv');

// dotenv.config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// connection.connect((error) => {
//   if (error) {
//     console.error('Error connecting to the database:', error);
//   } else {
//     console.log('Connected to the database');
//   }
// });

// module.exports = connection;