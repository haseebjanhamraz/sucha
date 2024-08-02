import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";
import { calculateFullAge } from "../utils/calculateAge";
import BackButton from "../components/BackButton";
import { useTheme } from "../ThemeContext";
import useSingleMilkRecord from "../hooks/useSingleMilkRecord";

const SingleCowPage = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const { token } = useAuth();
  const [cow, setCow] = useState(null);
  const [vaccineRecord, setVaccineRecord] = useState(null);
  const [vaccineData, setVaccineData] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const {
    milkRecords,
    totalQuantity,
    loading: milkLoading,
    error: milkError,
  } = useSingleMilkRecord(id);

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

    const fetchVaccineRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/vaccine-records/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVaccineRecord(response.data);
      } catch (err) {
        setError("Failed to fetch cow data.");
      }
    };

    fetchVaccineRecord();
  }, [id, token]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = milkRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(milkRecords.length / recordsPerPage);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!cow) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex lg:flex-nowrap md:flex-wrap flex-wrap w-full mx-auto p-4${
        theme === "dark"
          ? "bg-gray-900 text-blue-400"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <BackButton />
      <div className="CowDetails border-2 p-4 m-4 rounded-md">
        <h2 className="text-2xl  font-bold text-center m-5">Cow Details</h2>
        <p className={`border-2 mt-2 text-lg p-2 rounded-lg  font-medium`}>
          Tag: {cow.tag}
        </p>
        <p className={`border-2 mt-2 text-lg p-2 rounded-lg  font-medium`}>
          Breed: {cow.breed}
        </p>
        <p className={`border-2 mt-2 text-lg p-2 rounded-lg  font-medium`}>
          DOB: {formatDate(cow.dob)}
        </p>
        <p className={`border-2 mt-2 text-lg p-2 rounded-lg  font-medium`}>
          Age: {calculateFullAge(cow.dob)}
        </p>
        <p className={`border-2 mt-2 text-lg p-2 rounded-lg  font-medium`}>
          Dam: {cow.dam}
        </p>
        <p className={`border-2 mt-2 text-lg p-2 rounded-lg  font-medium`}>
          Sire: {cow.sire}
        </p>
        <p className={`border-2 mt-2 text-lg p-2 rounded-lg  font-medium`}>
          Sex: {cow.sex}
        </p>
        <p className={`border-2 mt-2 text-lg p-2 rounded-lg  font-medium`}>
          Color: {cow.color}
        </p>
        <p className={`border-2 mt-2 text-lg p-2 rounded-lg  font-medium`}>
          Total Milk: <span className="font-bold">{totalQuantity} Ltrs</span>
        </p>
      </div>
      <div className="CowDetails w-full border-2 p-4 m-4 rounded-md">
        <h2 className="text-2xl  font-bold text-center m-5">Milk Records</h2>
        {milkError ? (
          <div className="text-red-500">{milkError}</div>
        ) : milkLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 overflow-x-auto">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">S.No</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2 hidden sm:table-cell">
                    Time
                  </th>
                  <th className="border border-gray-300 p-2 hidden sm:table-cell">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentRecords.map((record, index) => (
                  <tr key={record._id} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">
                      {indexOfFirstRecord + index + 1}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {formatDate(record.date)}
                    </td>
                    <td className="border border-gray-300 p-2 hidden sm:table-cell">
                      {record.time}
                    </td>
                    <td className="border border-gray-300 p-2 hidden sm:table-cell">
                      {record.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border border-gray-300 p-2 font-bold">
                    Total
                  </td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2 hidden sm:table-cell"></td>
                  <td className="border border-gray-300 p-2 hidden sm:table-cell">
                    {totalQuantity}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        <div className="pagination mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mx-1 border ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="CowDetails w-full border-2 p-4 m-4 rounded-md">
        <h2 className="text-2xl  font-bold text-center m-5">
          Vaccination Records
        </h2>
        {milkError ? (
          <div className="text-red-500">{milkError}</div>
        ) : milkLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 overflow-x-auto">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2 hidden sm:table-cell">
                    Vaccine
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {vaccineRecord.map((vaccine, index) => (
                  <tr key={vaccine._id} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">
                      {formatDate(vaccine.date)}
                    </td>
                    <td className="border border-gray-300 p-2 hidden sm:table-cell">
                      {vaccine.vaccine}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCowPage;
