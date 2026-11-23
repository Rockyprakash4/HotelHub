import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import HotelForm from "../components/HotelForm";
import { API } from "../api";

function AddHotel() {
  const { id } = useParams();       // id exists only in edit mode
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState("");

  // in edit mode, load the existing hotel
  useEffect(() => {
    if (id) {
      axios.get(`${API}/api/hotels/${id}`).then((res) => {
        setHotel({ ...res.data, imageUrl: `${API}/${res.data.image}` });
      });
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      if (id) {
        await axios.put(`${API}/api/hotels/${id}`, formData);
      } else {
        await axios.post(`${API}/api/hotels`, formData);
      }
      navigate("/");
    } catch (error) {
      const errs = error.response?.data?.errors;
      setMessage(errs ? errs.join(", ") : "Something went wrong");
    }
  };

  // wait until hotel is loaded in edit mode
  if (id && !hotel) return <p>Loading...</p>;

  return (
    <div>
      <Helmet>
        <title>{id ? "Edit Hotel" : "Add Hotel"} | HotelHub</title>
      </Helmet>
      <h2>{id ? "Edit Hotel" : "Add New Hotel"}</h2>
      {message && <p className="error">{message}</p>}
      <HotelForm
        initialData={hotel || {}}
        onSubmit={handleSubmit}
        buttonText={id ? "Update Hotel" : "Add Hotel"}
      />
    </div>
  );
}

export default AddHotel;
