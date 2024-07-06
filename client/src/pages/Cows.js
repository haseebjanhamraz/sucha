import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCowModal from "../components/cows/AddCowModal";
import { IoMdAddCircle } from "react-icons/io";

const Cows = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10); // default 10 rows per page
  const [showModal, setShowModal] = useState(false);

  const fetchCows = async () => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve token from session storage
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `http://localhost:8080/api/animals?page=${page}&perPage=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized access. Please log in again.");
        }
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Animals data:", data);
      setData(data); // Update the data state
      setLoading(false); // Update the loading state
      setTotalPages(data.totalPages); // Update the totalPages state
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message); // Update the error state
      setLoading(false); // Update the loading state
    }
  };

  useEffect(() => {
    fetchCows();
  }, [page, perPage]);

  return (
    <>
      <div className="p-6 mt-5">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full h-fit bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    S/N
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Tag
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Breed
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Dam
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Sire
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Sex
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Color
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((cow, index) => (
                  <tr key={cow._id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {(page - 1) * perPage + index + 1}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {cow.tag}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {cow.breed}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {new Date(cow.dob).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {cow.dam}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {cow.sire}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {cow.sex}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {cow.color}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded"
                disabled={page <= 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <select
                value={perPage}
                onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
              >
                <option value="5">5 rows per page</option>
                <option value="10">10 rows per page</option>
                <option value="20">20 rows per page</option>
                <option value="50">50 rows per page</option>
              </select>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Add Cow Modal */}
        <AddCowModal
          showModal={showModal}
          setShowModal={setShowModal}
          fetchCows={fetchCows}
        />
        <button
          onClick={() => setShowModal(true)}
          className="text-2xl fixed top-24 right-10 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          <IoMdAddCircle />
        </button>
      </div>
    </>
  );
};

export default Cows;
