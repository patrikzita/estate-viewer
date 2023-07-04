const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "estatedb",
  password: "password",
  port: 5432,
});

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
const port = 3000;

app.get("/apartments", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const result = await pool.query(
    "SELECT * FROM apartments ORDER BY id ASC LIMIT $1 OFFSET $2",
    [limit + 1, offset]
  );

  const rows = result.rows;
  const hasMore = rows.length > limit;

  if (hasMore) {
    rows.pop();
  }

  res.json({
    hasMore,
    apartments: rows,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
