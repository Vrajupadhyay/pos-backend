// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// require('dotenv').config();

// // Initialize the Express app
// const app = express();
// app.use(cors());
// app.use(express.json());

// // MySQL Pool Connection for better handling in server environments
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10, // max number of concurrent connections
//   queueLimit: 0, // unlimited wait queue length
// });

// // Use promise wrapper around pool.query
// const promisePool = pool.promise();

// // Route for getting products (GET /products)
// app.get('/products', async (req, res) => {
//   try {
//     const [results] = await promisePool.query('SELECT * FROM products');
//     res.status(200).json(results); // Return products in JSON format
//   } catch (err) {
//     res.status(500).json({ error: 'Database query failed', details: err });
//   }
// });

// // Route for creating orders (POST /orders)
// app.post('/orders', async (req, res) => {
//   const { user_id, product_id, quantity } = req.body;
//   try {
//     const [result] = await promisePool.query(
//       'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)',
//       [user_id, product_id, quantity]
//     );
//     res.status(200).json({ success: true, orderId: result.insertId });
//   } catch (err) {
//     res.status(500).json({ error: 'Database query failed', details: err });
//   }
// });

// // Route for getting all orders (GET /orders)
// app.get('/orders', async (req, res) => {
//   const query = `
//     SELECT 
//       orders.id AS order_id,
//       orders.user_id,
//       users.username,
//       orders.product_id,
//       products.name AS product_name,
//       orders.quantity
//     FROM orders
//     JOIN users ON orders.user_id = users.id
//     JOIN products ON orders.product_id = products.id
//   `;
//   try {
//     const [results] = await promisePool.query(query);
//     res.status(200).json(results); // Return orders in JSON format
//   } catch (err) {
//     res.status(500).json({ error: 'Database query failed', details: err });
//   }
// });

// // Start the server locally (for testing)
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

console.log("Serverless functions are ready to go!");