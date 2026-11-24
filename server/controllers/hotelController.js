
const Hotel = require("../models/hotelModel");

// Get all hotels with search, price filters, sorting and pagination
const getHotels = async (req, res) => {
  try {
    const {
      search = "",
      minPrice = "",
      maxPrice = "",
      sort = "newest",
      limit = "5",
      offset = "0",
    } = req.query;

    // Validate minimum and maximum prices
    if (
      (minPrice !== "" &&
        (!Number.isFinite(Number(minPrice)) || Number(minPrice) < 0)) ||
      (maxPrice !== "" &&
        (!Number.isFinite(Number(maxPrice)) || Number(maxPrice) < 0))
    ) {
      return res.status(400).json({
        message: "Please enter valid prices",
      });
    }

    if (
      minPrice !== "" &&
      maxPrice !== "" &&
      Number(minPrice) > Number(maxPrice)
    ) {
      return res.status(400).json({
        message: "Minimum price cannot exceed maximum price",
      });
    }

    // Validate pagination values
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);

    if (
      !Number.isInteger(parsedLimit) ||
      parsedLimit < 1 ||
      !Number.isInteger(parsedOffset) ||
      parsedOffset < 0
    ) {
      return res.status(400).json({
        message: "Invalid pagination values",
      });
    }

    const safeLimit = Math.min(parsedLimit, 100);

    // Get filtered hotels from database
    const result = await Hotel.getAllHotels({
      search,
      minPrice,
      maxPrice,
      sort,
      limit: safeLimit,
      offset: parsedOffset,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting hotels:", error);

    res.status(500).json({
      message: "Failed to get hotels",
      error: error.message,
    });
  }
};

// Get one hotel
const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.getHotelById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error getting hotel:", error);

    res.status(500).json({
      message: "Failed to get hotel",
    });
  }
};

// Create hotel
const addHotel = async (req, res) => {
  try {
    const {
      title,
      description,
      latitude,
      longitude,
      price,
    } = req.body;

    if (
      !title ||
      !description ||
      latitude === undefined ||
      longitude === undefined ||
      price === undefined ||
      !req.file
    ) {
      return res.status(400).json({
        message: "All hotel fields and image are required",
      });
    }

    const hotel = await Hotel.createHotel({
      title,
      description,
      latitude,
      longitude,
      price,
      image: `uploads/${req.file.filename}`,
    });

    res.status(201).json(hotel);
  } catch (error) {
    console.error("Error adding hotel:", error);

    res.status(500).json({
      message: "Failed to add hotel",
      error: error.message,
    });
  }
};

// Update hotel
const editHotel = async (req, res) => {
  try {
    const {
      title,
      description,
      latitude,
      longitude,
      price,
    } = req.body;

    const existingHotel = await Hotel.getHotelById(req.params.id);

    if (!existingHotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    if (
      !title ||
      !description ||
      latitude === undefined ||
      longitude === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        message: "All hotel fields are required",
      });
    }

    const image = req.file
      ? `uploads/${req.file.filename}`
      : null;

    const hotel = await Hotel.updateHotel(req.params.id, {
      title,
      description,
      latitude,
      longitude,
      price,
      image,
    });

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error updating hotel:", error);

    res.status(500).json({
      message: "Failed to update hotel",
      error: error.message,
    });
  }
};

// Delete hotel
const removeHotel = async (req, res) => {
  try {
    const hotel = await Hotel.deleteHotel(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hotel:", error);

    res.status(500).json({
      message: "Failed to delete hotel",
      error: error.message,
    });
  }
};

module.exports = {
  getHotels,
  getHotel,
  addHotel,
  editHotel,
  removeHotel,
};
