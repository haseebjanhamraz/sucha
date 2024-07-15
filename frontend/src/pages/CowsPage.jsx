import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useTheme } from "../ThemeContext";
import { calculateFullAge } from "../utils/calculateAge";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

const CowsPage = () => {
  const { theme } = useTheme();
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
    <>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-900 text-blue-400"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">
          Cows
          <span className="inline-flex items-center rounded-md bg-blue-50 mx-1 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
            {cows.length}
          </span>
        </h1>

        <Link
          to="/cows/add"
          className="p-2 bg-blue-500 text-white rounded mb-4 inline-block"
        >
          Add Cow
        </Link>

        <input
          type="text"
          placeholder="Search by tag"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 overflow-x-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">S#</th>
                <th className="border border-gray-300 p-2">Tag#</th>
                <th className="border border-gray-300 p-2">Breed</th>
                <th className="border border-gray-300 p-2 hidden sm:table-cell">
                  DOB
                </th>
                <th className="border border-gray-300 p-2 hidden sm:table-cell">
                  Age
                </th>
                <th className="border border-gray-300 p-2 hidden md:table-cell">
                  Dam
                </th>
                <th className="border border-gray-300 p-2 hidden md:table-cell">
                  Sire
                </th>
                <th className="border border-gray-300 p-2">Sex</th>
                <th className="border border-gray-300 p-2 hidden lg:table-cell">
                  Color
                </th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {displayedCows.map((cow, index) => (
                <tr key={cow._id} className="border border-gray-300">
                  <td className="border border-gray-300 p-2">
                    {currentPage * pageSize + index + 1}
                  </td>
                  <td className="border border-gray-300 p-2">{cow.tag}</td>
                  <td className="border border-gray-300 p-2">{cow.breed}</td>
                  <td className="border border-gray-300 p-2 hidden sm:table-cell">
                    {formatDate(cow.dob)}
                  </td>
                  <td className="border border-gray-300 p-2 hidden sm:table-cell">
                    {calculateFullAge(cow.dob)}
                  </td>
                  <td className="border border-gray-300 p-2 hidden md:table-cell">
                    {cow.dam}
                  </td>
                  <td className="border border-gray-300 p-2 hidden md:table-cell">
                    {cow.sire}
                  </td>
                  <td className="border border-gray-300 p-2">{cow.sex}</td>
                  <td className="border border-gray-300 p-2 hidden lg:table-cell">
                    {cow.color}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <Link
                      to={`/cows/edit/${cow._id}`}
                      className="p-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    </>
  );
};

export default CowsPage;
