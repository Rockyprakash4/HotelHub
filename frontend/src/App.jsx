
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddHotel from "./pages/AddHotel";
import HotelDetail from "./pages/HotelDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Hotel Pages */}
          <Route path="/add" element={<AddHotel />} />
          <Route path="/edit/:id" element={<AddHotel />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;




