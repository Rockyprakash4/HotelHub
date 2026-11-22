
import { Link } from "react-router-dom";
import { Hotel } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <Hotel size={28} />
          <span>HotelHub</span>
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <a href="#hotels">Hotels</a>
        </div>

        <Link to="/" className="add-button">
          Add Hotel
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;

