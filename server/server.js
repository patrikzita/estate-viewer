import express from "express";
import cors from "cors";
import pg from "pg";
import { z } from "zod";
import config from "./config.js";
const { Pool } = pg;

const pool = new Pool(config.db);

const paginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1).max(100),
});

const app = express();
app.use(cors({ origin: ["http://localhost:8080", "http://localhost:5173"] }));
const port = config.server.port;

app.get("/apartments", async (req, res) => {
  let { page = 1, limit = 20 } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  const { error } = paginationSchema.safeParse({ page, limit });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const offset = (page - 1) * limit;

  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occurred while getting apartmens." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
