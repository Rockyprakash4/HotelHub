
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import HotelForm from "../components/HotelForm";
import { API } from "../api";

function AddHotel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load existing hotel when editing
  useEffect(() => {
    if (!id) return;

    const loadHotel = async () => {
      try {
        setLoading(true);
        setMessage("");

        const res = await axios.get(`${API}/api/hotels/${id}`);

        setHotel({
          ...res.data,
          imageUrl: res.data.image
            ? `${API}/${res.data.image}`
            : "",
        });
      } catch (error) {
        console.error("Error loading hotel:", error);

        setMessage(
          error.response?.data?.message ||
          "Unable to load hotel. Please check the backend."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHotel();
  }, [id]);

  // Add or update hotel
  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setMessage("");

      if (id) {
        await axios.put(`${API}/api/hotels/${id}`, formData);
      } else {
        await axios.post(`${API}/api/hotels`, formData);
      }

      navigate("/");
    } catch (error) {
      console.error("Hotel submission error:", error);

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading hotel details...</p>;
  }

  if (id && !hotel && message) {
    return <p className="error">{message}</p>;
  }

  if (id && !hotel) {
    return <p>Loading...</p>;
  }

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
        buttonText={
          submitting
            ? "Saving..."
            : id
              ? "Update Hotel"
              : "Add Hotel"
        }
      />
    </div>
  );
}

export default AddHotel;

