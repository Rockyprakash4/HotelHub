
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Access uploaded images
app.use("/uploads", express.static("uploads"));

// Test API
app.get("/", (req, res) => {
  res.send("Hotel Management API is running!");
});

// Port number
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
