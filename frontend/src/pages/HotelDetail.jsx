import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { API } from "../api";

function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/hotels/${id}`).then((res) => setHotel(res.data));
  }, [id]);

  if (!hotel) return <p>Loading...</p>;

  const lat = Number(hotel.latitude);
  const lng = Number(hotel.longitude);

  // OpenStreetMap embed (free, no API key). bbox = small box around the point
  const mapUrl =
    `https://www.openstreetmap.org/export/embed.html?bbox=` +
    `${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}` +
    `&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="detail">
      {/* dynamic meta tags for SEO */}
      <Helmet>
        <title>{hotel.title} | HotelHub</title>
        <meta name="description" content={hotel.description.slice(0, 150)} />
        <meta property="og:title" content={hotel.title} />
        <meta property="og:image" content={`${API}/${hotel.image}`} />
      </Helmet>

      <Link to="/" className="btn gray">← Back</Link>

      <img src={`${API}/${hotel.image}`} alt={hotel.title} className="detail-img" />
      <h2>{hotel.title}</h2>
      <p className="price">₹{hotel.price}</p>
      <p>{hotel.description}</p>
      <p>
        <b>Location:</b> {lat}, {lng}
      </p>

      <iframe title={`Map of ${hotel.title}`} src={mapUrl} className="map"></iframe>
    </div>
  );
}

export default HotelDetail;