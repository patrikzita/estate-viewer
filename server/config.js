import dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "db",
    database: process.env.DB_NAME || "estatedb",
    password: process.env.DB_PASS || "password",
    port: process.env.DB_PORT || 5432,
  },
  server: {
    port: process.env.PORT || 3000,
  },
};
