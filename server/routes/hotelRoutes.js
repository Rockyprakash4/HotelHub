
const express = require("express");
const router = express.Router();

const {
  getHotels,
  getHotel,
  addHotel,
  editHotel,
  removeHotel,
} = require("../controllers/hotelController");

const upload = require("../middleware/upload");

// Get all hotels
router.get("/", getHotels);

// Get one hotel
router.get("/:id", getHotel);

// Add a hotel
router.post("/", upload.single("image"), addHotel);

// Update a hotel
router.put("/:id", upload.single("image"), editHotel);

// Delete a hotel
router.delete("/:id", removeHotel);

module.exports = router;
