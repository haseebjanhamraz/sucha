// src/pages/SingleCowPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SingleCowPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [cow, setCow] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
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
        setCow(response.data);
      } catch (err) {
        setError("Failed to fetch cow data.");
      }
    };

    fetchCow();
  }, [id, token]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!cow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container w-80 mx-auto p-4">
      <h2 className="text-2xl mb-4">Cow Details</h2>
      <div className="mb-2">
        <strong>Tag:</strong> {cow.tag}
      </div>
      <div className="mb-2">
        <strong>Breed:</strong> {cow.breed}
      </div>
      <div className="mb-2">
        <strong>Date of Birth:</strong> {new Date(cow.dob).toLocaleDateString()}
      </div>
      <div className="mb-2">
        <strong>Dam:</strong> {cow.dam}
      </div>
      <div className="mb-2">
        <strong>Sire:</strong> {cow.sire}
      </div>
      <div className="mb-2">
        <strong>Sex:</strong> {cow.sex}
      </div>
      <div className="mb-2">
        <strong>Color:</strong> {cow.color}
      </div>
    </div>
  );
};

export default SingleCowPage;
