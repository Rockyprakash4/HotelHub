
const { Pool } = require("pg");
require("dotenv").config();

// Create a connection with PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// Check database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("PostgreSQL connected successfully!");
    release();
  }
});

module.exports = pool;
