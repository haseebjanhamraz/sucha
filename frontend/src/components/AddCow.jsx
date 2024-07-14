import React, { useState } from "react";
import axios from "axios";

const AddCow = ({ onClose, setFlashMessage }) => {
  const [formData, setFormData] = useState({
    tag: "",
    breed: "",
    dob: "",
    dam: "",
    sire: "",
    sex: "",
    color: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/animals", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFlashMessage({ type: "success", message: "Cow added successfully!" });
      onClose();
    } catch (error) {
      setFlashMessage({ type: "error", message: "Failed to add cow." });
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Add New Cow</h2>
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
        >
          Add Cow
        </button>
      </form>
    </div>
  );
};

export default AddCow;
