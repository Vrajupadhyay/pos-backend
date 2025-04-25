// Updated POS Backend (Node.js + Express + MySQL with .env support)
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

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

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

// Routes
app.get("/products", async (req, res) => {
  try {
    const [results] = await promisePool.query("SELECT * FROM products");
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/orders", async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  try {
    const [result] = await promisePool.query(
      "INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [user_id, product_id, quantity]
    );
    res.json({ success: true, orderId: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/orders", async (req, res) => {
  const query = `
      SELECT 
        orders.id AS order_id,
        orders.user_id,
        users.username,
        orders.product_id,
        products.name AS product_name,
        orders.quantity
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN products ON orders.product_id = products.id
    `;
  try {
    const [results] = await promisePool.query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
