// src/pages/SingleCowPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";
import { calculateFullAge } from "../utils/calculateAge";
import BackButton from "../components/BackButton";
import { useTheme } from "../ThemeContext";

const SingleCowPage = () => {
  const { theme } = useTheme();
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
    <div
      className={`container w-80 mx-auto p-4${
        theme === "dark"
          ? "bg-gray-900 text-blue-400"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <BackButton />
      <h2 className="text-2xl uppercase font-bold text-center m-5">
        Cow Details
      </h2>
      <p
        className={`border-2  mt-2 text-lg p-2 rounded-lg  uppercase font-medium`}
      >
        Tag : {cow.tag}
      </p>
      <p
        className={`border-2  mt-2 text-lg p-2 rounded-lg  uppercase font-medium`}
      >
        Breed : {cow.breed}
      </p>
      <p
        className={`border-2  mt-2 text-lg p-2 rounded-lg  uppercase font-medium`}
      >
        DOB : {formatDate(cow.dob)}
      </p>
      <p
        className={`border-2  mt-2 text-lg p-2 rounded-lg  uppercase font-medium`}
      >
        Age : {calculateFullAge(cow.dob)}
      </p>
      <p
        className={`border-2  mt-2 text-lg p-2 rounded-lg  uppercase font-medium`}
      >
        Dam : {cow.dam}
      </p>
      <p
        className={`border-2  mt-2 text-lg p-2 rounded-lg  uppercase font-medium`}
      >
        Sire : {cow.sire}
      </p>
      <p
        className={`border-2  mt-2 text-lg p-2 rounded-lg  uppercase font-medium`}
      >
        Sex : {cow.sex}
      </p>
      <p
        className={`border-2  mt-2 text-lg p-2 rounded-lg  uppercase font-medium`}
      >
        Color : {cow.color}
      </p>
    </div>
  );
};

export default SingleCowPage;
