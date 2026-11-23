
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import { setHotels, deleteHotel } from "../redux/hotelSlice";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";
import { API } from "../api";

const LIMIT = 5;

function Home() {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.hotels);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [popup, setPopup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load hotels from backend
  const loadHotels = async (
    pageNumber = page,
    filters = { search, minPrice, maxPrice, sort }
  ) => {
    try {
      setLoading(true);
      setError("");

      const offset = (pageNumber - 1) * LIMIT;

      const res = await axios.get(`${API}/api/hotels`, {
        params: {
          search: filters.search,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          sort: filters.sort,
          limit: LIMIT,
          offset,
        },
      });

      dispatch(setHotels(res.data.data));
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error loading hotels:", err);
      setError("Unable to load hotels. Please check your backend server.");
    } finally {
      setLoading(false);
    }
  };

  // Load hotels whenever page or sorting changes
  useEffect(() => {
    loadHotels(page);
  }, [page, sort]);

  // Apply search and price filters
  const handleApply = () => {
    setPage(1);

    loadHotels(1, {
      search,
      minPrice,
      maxPrice,
      sort,
    });
  };

  // Change sorting
  const handleSort = (value) => {
    setSort(value);
    setPage(1);
  };

  // Reset all filters
  const handleReset = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setPage(1);

    loadHotels(1, {
      search: "",
      minPrice: "",
      maxPrice: "",
      sort: "newest",
    });
  };

  // Delete hotel
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/api/hotels/${id}`);

      dispatch(deleteHotel(id));

      setPopup("Hotel deleted successfully!");

      setTimeout(() => {
        setPopup("");
      }, 2500);

      loadHotels(page);
    } catch (err) {
      console.error("Error deleting hotel:", err);
      setError("Unable to delete hotel. Please try again.");
    }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="home-page">

      <Helmet>
        <title>Hotel List | HotelHub</title>
        <meta
          name="description"
          content="Browse, search and manage hotels on HotelHub."
        />
      </Helmet>

      {/* Success notification */}
      {popup && <div className="popup">{popup}</div>}

      {/* Error notification */}
      {error && <div className="error-message">{error}</div>}

      {/* Hero Section */}
      <div className="hero">
        <h1>Find Your Perfect Stay</h1>
        <p>{total} hotels and places to stay</p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search hotels by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleApply}>
            Search
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">

        <h2>Find Hotels</h2>

        <div className="filter-controls">

          <input
            type="number"
            placeholder="Minimum Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <select
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>

          <button onClick={handleApply}>
            Apply Filters
          </button>

          <button onClick={handleReset}>
            Reset
          </button>

        </div>
      </div>

      {/* Hotel Listing Section */}
      <div className="hotel-list-section">

        <h2>Available Hotels</h2>

        {loading ? (
          <p>Loading hotels...</p>
        ) : hotels.length === 0 ? (
          <p>No hotels found. Try changing your search or filters.</p>
        ) : (
          <div className="hotel-grid">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

    </div>
  );
}

export default Home;
