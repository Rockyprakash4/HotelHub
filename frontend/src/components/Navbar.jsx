
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* HotelHub Logo */}
        <Link to="/" className="logo">
          🏨 Hotel<span>Hub</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">

          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/add" className="nav-link">
            Add Hotel
          </NavLink>

          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>

          <Link to="/register" className="btn nav-btn">
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;


