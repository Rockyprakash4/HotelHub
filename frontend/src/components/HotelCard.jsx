import { Link } from "react-router-dom";
import { API } from "../api";

function HotelCard({ hotel, onDelete }) {
  return (
    <div className="hotel-row">
      <Link to={`/hotel/${hotel.id}`} className="img-wrap">
        <img src={`${API}/${hotel.image}`} alt={hotel.title} />
      </Link>

      <div className="hotel-info">
        <Link to={`/hotel/${hotel.id}`}>
          <h3 className="hotel-title">{hotel.title}</h3>
        </Link>
        <span className="chip">
          📍 {Number(hotel.latitude).toFixed(3)}, {Number(hotel.longitude).toFixed(3)}
        </span>
        <p className="hotel-desc">
          {hotel.description.length > 140
            ? hotel.description.slice(0, 140) + "..."
            : hotel.description}
        </p>
        <div className="actions">
          <Link to={`/edit/${hotel.id}`} className="btn small outline">✏️ Edit</Link>
          <button className="btn small danger" onClick={() => onDelete(hotel.id)}>
            🗑 Delete
          </button>
        </div>
      </div>

      <div className="hotel-price-box">
        <span className="price-label">Price from</span>
        <span className="price">₹{Number(hotel.price).toLocaleString("en-IN")}</span>
        <span className="price-note">per night</span>
        <Link to={`/hotel/${hotel.id}`} className="btn">View details</Link>
      </div>
    </div>
  );
}

export default HotelCard;