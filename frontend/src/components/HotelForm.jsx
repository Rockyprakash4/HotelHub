import { useState } from "react";

// props:
//   initialData = hotel to edit (or empty object when adding)
//   onSubmit    = function that receives the form data
//   buttonText  = "Add Hotel" or "Update Hotel"
function HotelForm({ initialData, onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [latitude, setLatitude] = useState(initialData.latitude || "");
  const [longitude, setLongitude] = useState(initialData.longitude || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialData.imageUrl || "");
  const [errors, setErrors] = useState({});

  // show preview when a file is chosen
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // check all fields, return an object of error messages
  const validate = () => {
    const err = {};
    if (title.trim().length < 3) err.title = "Title must be at least 3 characters";
    if (description.trim().length < 10) err.description = "Description must be at least 10 characters";
    if (latitude === "" || latitude < -90 || latitude > 90) err.latitude = "Latitude must be between -90 and 90";
    if (longitude === "" || longitude < -180 || longitude > 180) err.longitude = "Longitude must be between -180 and 180";
    if (price === "" || Number(price) <= 0) err.price = "Price must be greater than 0";
    if (!image && !preview) err.image = "Please choose an image";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return; // stop if errors

    // FormData is needed to send a file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("price", price);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Image</label>
      <input type="file" accept="image/*" onChange={handleImage} />
      {preview && <img src={preview} alt="Hotel preview" className="preview" />}
      {errors.image && <p className="error">{errors.image}</p>}

      <label>Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      {errors.title && <p className="error">{errors.title}</p>}

      <label>Description</label>
      <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
      {errors.description && <p className="error">{errors.description}</p>}

      <div className="row">
        <div>
          <label>Latitude</label>
          <input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          {errors.latitude && <p className="error">{errors.latitude}</p>}
        </div>
        <div>
          <label>Longitude</label>
          <input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          {errors.longitude && <p className="error">{errors.longitude}</p>}
        </div>
      </div>

      <label>Price (₹)</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      {errors.price && <p className="error">{errors.price}</p>}

      <button type="submit" className="btn">{buttonText}</button>
    </form>
  );
}

export default HotelForm;

