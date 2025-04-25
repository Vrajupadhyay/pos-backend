import mysql from 'mysql2';
import express from 'express';
const cors = require('cors');

// Initialize the Express app
const app = express();
app.use(cors());

// MySQL Pool Connection for better handling in serverless environments
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // max number of concurrent connections
  queueLimit: 0, // unlimited wait queue length
});

// Use promise wrapper around pool.query
const promisePool = pool.promise();

export default async function handler(req, res) {
  try {
    const [results] = await promisePool.query("SELECT * FROM products");
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
}
