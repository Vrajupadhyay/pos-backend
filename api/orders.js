import mysql from 'mysql2';

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
  if (req.method === 'POST') {
    const { user_id, product_id, quantity } = req.body;
    try {
      const [result] = await promisePool.query(
        "INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [user_id, product_id, quantity]
      );
      res.status(200).json({ success: true, orderId: result.insertId });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
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
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
