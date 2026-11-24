
import { useEffect, useState } from "react";

function HotelForm({ initialData = {}, onSubmit, buttonText }) {

  // Store all form value
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [latitude, setLatitude] = useState(initialData.latitude ?? "");
  const [longitude, setLongitude] = useState(initialData.longitude ?? "");
  const [price, setPrice] = useState(initialData.price ?? "");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialData.imageUrl || "");
  const [errors, setErrors] = useState({});

  // Update form values 
  useEffect(() => {
    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setLatitude(initialData.latitude ?? "");
    setLongitude(initialData.longitude ?? "");
    setPrice(initialData.price ?? "");
    setPreview(initialData.imageUrl || "");
    setImage(null);
  }, [
    initialData.title,
    initialData.description,
    initialData.latitude,
    initialData.longitude,
    initialData.price,
    initialData.imageUrl
  ]);

  // Remove temporary image previews 
  useEffect(() => {
    if (preview.startsWith("blob:")) {
      return () => URL.revokeObjectURL(preview);
    }
  }, [preview]);

  // Handle image selection
  const handleImage = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      setPreview(URL.createObjectURL(selectedImage));

      // Remove previous image error
      setErrors((previousErrors) => ({
        ...previousErrors,
        image: ""
      }));
    }
  };

  // Check whether the entered details are valid
  const validateForm = () => {
    const newErrors = {};

    if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    const lat = Number(latitude);
    const lng = Number(longitude);
    const hotelPrice = Number(price);

    if (
      latitude === "" ||
      !Number.isFinite(lat) ||
      lat < -90 ||
      lat > 90
    ) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    if (
      longitude === "" ||
      !Number.isFinite(lng) ||
      lng < -180 ||
      lng > 180
    ) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }

    if (
      price === "" ||
      !Number.isFinite(hotelPrice) ||
      hotelPrice <= 0
    ) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!image && !preview) {
      newErrors.image = "Please choose an image";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    setErrors(formErrors);

    // Stop submission if any validation error exists
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    // FormData is used because we are sending an image file
    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("price", price);

    // Send the image only when a new image is selected
    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      {/* Hotel Image */}
      <label>Hotel Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      {preview && (
        <img
          src={preview}
          alt="Hotel Preview"
          className="preview"
        />
      )}

      {errors.image && <p className="error">{errors.image}</p>}

      {/* Hotel Title */}
      <label>Hotel Name</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter hotel name"
      />

      {errors.title && <p className="error">{errors.title}</p>}

      {/* Hotel Description */}
      <label>Description</label>
      <textarea
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter hotel description"
      />

      {errors.description && (
        <p className="error">{errors.description}</p>
      )}

      {/* Hotel Location */}
      <div className="row">

        <div>
          <label>Latitude</label>
          <input
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude"
          />

          {errors.latitude && (
            <p className="error">{errors.latitude}</p>
          )}
        </div>

        <div>
          <label>Longitude</label>
          <input
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude"
          />

          {errors.longitude && (
            <p className="error">{errors.longitude}</p>
          )}
        </div>

      </div>

      {/* Hotel Price */}
      <label>Price (₹)</label>
      <input
        type="number"
        min="1"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter hotel price"
      />

      {errors.price && <p className="error">{errors.price}</p>}

      {/* Submit Button */}
      <button type="submit" className="btn">
        {buttonText}
      </button>

    </form>
  );
}

export default HotelForm;


