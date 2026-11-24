const pool = require("../config/db");

// Get hotels with search, price filters, sorting and pagination
const getAllHotels = async (filters = {}) => {
  const {
    search = "",
    minPrice = "",
    maxPrice = "",
    sort = "newest",
    limit = 5,
    offset = 0,
  } = filters;

  const conditions = [];
  const values = [];

  // Search hotel name and description
  if (search.trim()) {
    values.push(`%${search.trim()}%`);
    conditions.push(
      `(title ILIKE $${values.length} OR description ILIKE $${values.length})`
    );
  }

  // Minimum price
  if (minPrice !== "") {
    values.push(Number(minPrice));
    conditions.push(`price >= $${values.length}`);
  }

  // Maximum price
  if (maxPrice !== "") {
    values.push(Number(maxPrice));
    conditions.push(`price <= $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  // Only allow these predefined sorting options
  const sortOptions = {
    newest: "id DESC",
    oldest: "id ASC",
    price_low: "price ASC",
    price_high: "price DESC",
    name: "title ASC",
  };

  const orderBy = sortOptions[sort] || sortOptions.newest;

  // Get total matching hotels before pagination
  const countResult = await pool.query(
    `SELECT COUNT(*) FROM hotels ${whereClause}`,
    values
  );

  // Get the current page of hotels
  const hotelValues = [...values, Number(limit), Number(offset)];

  const result = await pool.query(
    `SELECT * FROM hotels
     ${whereClause}
     ORDER BY ${orderBy}
     LIMIT $${hotelValues.length - 1}
     OFFSET $${hotelValues.length}`,
    hotelValues
  );

  return {
    data: result.rows,
    total: Number(countResult.rows[0].count),
  };
};

// Get one hotel by ID
const getHotelById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM hotels WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// Add a new hotel
const createHotel = async (hotel) => {
  const { title, description, latitude, longitude, price, image } = hotel;

  const result = await pool.query(
    `INSERT INTO hotels
    (title, description, latitude, longitude, price, image)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [title, description, latitude, longitude, price, image]
  );

  return result.rows[0];
};

// Update a hotel
const updateHotel = async (id, hotel) => {
  const { title, description, latitude, longitude, price, image } = hotel;

  const result = await pool.query(
    `UPDATE hotels
     SET title = $1,
         description = $2,
         latitude = $3,
         longitude = $4,
         price = $5,
         image = COALESCE($6, image)
     WHERE id = $7
     RETURNING *`,
    [title, description, latitude, longitude, price, image, id]
  );

  return result.rows[0];
};

// Delete a hotel
const deleteHotel = async (id) => {
  const result = await pool.query(
    "DELETE FROM hotels WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
};
