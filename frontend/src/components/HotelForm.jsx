
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HotelForm({ initialHotel = null, onSubmit }) {
  const navigate = useNavigate();

  const [hotelName, setHotelName] = useState(initialHotel?.name || "");
  const [description, setDescription] = useState(initialHotel?.description || "");
  const [price, setPrice] = useState(initialHotel?.price || "");
  const [latitude, setLatitude] = useState(initialHotel?.latitude || "");
  const [longitude, setLongitude] = useState(initialHotel?.longitude || "");
  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(
    initialHotel?.image || ""
  );

  useEffect(() => {
    if (!image) {
      return;
    }

    const imageUrl = URL.createObjectURL(image);
    setImagePreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const hotelData = {
      name: hotelName,
      description: description,
      price: Number(price),
      latitude: latitude === "" ? null : Number(latitude),
      longitude: longitude === "" ? null : Number(longitude),
      image: image,
    };

    if (onSubmit) {
      onSubmit(hotelData);
    } else {
      alert("Hotel form submitted successfully!");
      console.log(hotelData);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="hotel-form-page">
      <div className="hotel-form-container">
        <h1>{initialHotel ? "Edit Hotel" : "Add New Hotel"}</h1>

        <p>Enter the details of your hotel below.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Hotel Name</label>

            <input
              type="text"
              placeholder="Enter hotel name"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              placeholder="Enter hotel description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Price Per Night</label>

            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Hotel Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Hotel preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Latitude</label>

            <input
              type="number"
              step="any"
              placeholder="Enter latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Longitude</label>

            <input
              type="number"
              step="any"
              placeholder="Enter longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <div className="form-buttons">
            <button type="submit">
              {initialHotel ? "Update Hotel" : "Save Hotel"}
            </button>

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HotelForm;

