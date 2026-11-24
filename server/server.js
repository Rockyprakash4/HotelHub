
const express = require("express");
const cors = require("cors");
const path = require("path");

const pool = require("./config/db");
const hotelRoutes = require("./routes/hotelRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Access uploaded images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Test API
app.get("/", (req, res) => {
  res.send("Hotel Management API is running!");
});

// Test database connection
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "PostgreSQL connected successfully!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Hotel routes
app.use("/api/hotels", hotelRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


