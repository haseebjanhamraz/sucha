// src/pages/CowsPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const CowsPage = () => {
  const { token } = useAuth();
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/animals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCows(response.data.data);
      } catch (err) {
        setError("Failed to fetch cows. Please check your authentication.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCows();
    } else {
      setError("No authentication token found.");
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const filteredCows = cows.filter((cow) =>
    cow.tag.toLowerCase().includes(searchInput.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCows.length / pageSize);
  const displayedCows = filteredCows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cows</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Tag#</th>
            <th className="border border-gray-300 p-2">Breed</th>
            <th className="border border-gray-300 p-2">DOB</th>
            <th className="border border-gray-300 p-2">Dam</th>
            <th className="border border-gray-300 p-2">Sire</th>
            <th className="border border-gray-300 p-2">Sex</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {displayedCows.map((cow) => (
            <tr key={cow._id} className="border border-gray-300">
              <td className="border border-gray-300 p-2">{cow.tag}</td>
              <td className="border border-gray-300 p-2">{cow.breed}</td>
              <td className="border border-gray-300 p-2">{cow.dob}</td>
              <td className="border border-gray-300 p-2">{cow.dam}</td>
              <td className="border border-gray-300 p-2">{cow.sire}</td>
              <td className="border border-gray-300 p-2">{cow.sex}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <span>
          Page{" "}
          <strong>
            {currentPage + 1} of {totalPages}
          </strong>
        </span>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="mr-2 p-2 bg-gray-300 rounded"
          >
            {"<"}
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className="p-2 bg-gray-300 rounded"
          >
            {">"}
          </button>
        </div>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(0); // Reset to first page
          }}
          className="ml-4 p-2 border border-gray-300 rounded"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CowsPage;
