const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "estatedb",
  password: "password",
  port: 5432,
});

const app = express();
const port = 3000;

app.get('/apartments', async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 50;
  const offset = (page - 1) * limit;

  const result = await pool.query('SELECT * FROM apartments ORDER BY id ASC LIMIT $1 OFFSET $2', [limit, offset]);
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
