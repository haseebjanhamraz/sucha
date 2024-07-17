import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const AddEditCowPage = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tag: "",
    breed: "",
    dob: "",
    dam: "",
    sire: "",
    sex: "",
    color: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchCow = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/animals/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFormData(response.data);
        } catch (err) {
          setError("Failed to fetch cow data.");
        }
      };

      fetchCow();
    }
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/animals/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("http://localhost:8080/api/animals", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      enqueueSnackbar("Added Successfully!");
      navigate("/cows");
    } catch (err) {
      setError("Failed to save cow data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container w-80 mx-auto p-4">
      <h2 className="text-2xl mb-4">{id ? "Edit Cow" : "Add New Cow"}</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tag"
          placeholder="Tag"
          value={formData.tag}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="text"
          name="dam"
          placeholder="Dam"
          value={formData.dam}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="text"
          name="sire"
          placeholder="Sire"
          value={formData.sire}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="text"
          name="sex"
          placeholder="Sex"
          value={formData.sex}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : id ? "Update Cow" : "Add Cow"}
        </button>
      </form>
      <SnackbarProvider />
    </div>
  );
};

export default AddEditCowPage;
