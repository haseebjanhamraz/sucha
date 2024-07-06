// src/components/AddCowModal.js

import React, { useState, useEffect } from "react";

const AddCowModal = ({ showModal, setShowModal, fetchCows, cowId }) => {
  const [tag, setTag] = useState("");
  const [breed, setBreed] = useState("");
  const [dob, setDob] = useState("");
  const [dam, setDam] = useState("");
  const [sire, setSire] = useState("");
  const [sex, setSex] = useState("");
  const [color, setColor] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (cowId) {
      // Fetch the cow details if cowId is provided (for editing)
      fetchCowDetails(cowId);
    }
  }, [cowId]);

  const fetchCowDetails = async (id) => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve token from session storage
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`http://localhost:8080/api/animals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cow details");
      }

      const cow = await response.json();
      setTag(cow.tag);
      setBreed(cow.breed);
      setDob(cow.dob);
      setDam(cow.dam);
      setSire(cow.sire);
      setSex(cow.sex);
      setColor(cow.color);
    } catch (error) {
      console.error("Fetch cow details error:", error);
      setAlert({ type: "error", message: error.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token"); // Retrieve token from session storage
      if (!token) {
        throw new Error("No token found");
      }

      let url = "http://localhost:8080/api/animals";
      let method = "POST";

      if (cowId) {
        // If cowId exists, it's an edit operation
        url += `/${cowId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag, breed, dob, dam, sire, sex, color }),
      });

      if (!response.ok) {
        throw new Error("Failed to save cow");
      }

      const data = await response.json();
      setAlert({
        type: "success",
        message: cowId
          ? "Cow updated successfully!"
          : "Cow added successfully!",
      });
      fetchCows(); // Refresh the cow list
      setTimeout(() => {
        setAlert(null);
        setShowModal(false); // Close the modal after success
      }, 2000);
    } catch (error) {
      setAlert({ type: "error", message: error.message });
      setTimeout(() => setAlert(null), 2000);
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
          <h2 className="text-2xl mb-4">
            {cowId ? "Edit Cow" : "Add New Cow"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tag:
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Breed:
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date of Birth:
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Dam:
              </label>
              <input
                type="text"
                value={dam}
                onChange={(e) => setDam(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sire:
              </label>
              <input
                type="text"
                value={sire}
                onChange={(e) => setSire(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sex:
              </label>
              <input
                type="text"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Color:
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {cowId ? "Update Cow" : "Add Cow"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
          {alert && (
            <div
              className={`mt-4 p-4 rounded ${
                alert.type === "success" ? "bg-green-200" : "bg-red-200"
              } animate-bounce`}
            >
              {alert.message}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default AddCowModal;
