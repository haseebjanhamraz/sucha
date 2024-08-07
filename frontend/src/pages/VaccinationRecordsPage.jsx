// src/pages/VaccinationRecordsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useVaccineRecords from "../hooks/useVaccineRecords";
import useCows from "../hooks/useCows";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";

const VaccinationRecordsPage = () => {
  const { id } = useParams();
  const { vaccineRecord } = useVaccineRecords();
  const { cows } = useCows();
  const { token } = useAuth();

  const [newVaccineRecord, setNewVaccineRecord] = useState({
    animalId: "",
    vaccine: "",
    date: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewVaccineRecord({
      ...newVaccineRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/vaccine-records/`,
        newVaccineRecord,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVaccineRecord([...vaccineRecord, response.data]);
      setSuccess("Vaccine record added successfully!");
      setNewVaccineRecord({ animalId: "", vaccine: "", date: "" });
    } catch (err) {
      setError("Failed to add vaccine record.");
      setSuccess("");
    }
  };

  const getCowTag = (animalId) => {
    const cow = cows.find((cow) => cow._id === animalId);
    return cow ? cow.tag : "Unknown";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vaccination Records</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="animalId"
          value={newVaccineRecord.animalId}
          onChange={handleChange}
          placeholder="Animal ID"
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="vaccine"
          value={newVaccineRecord.vaccine}
          onChange={handleChange}
          placeholder="Vaccine"
          className="border p-2 mr-2"
          required
        />
        <input
          type="date"
          name="date"
          value={newVaccineRecord.date}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Vaccine Record
        </button>
      </form>
      <div>
        {vaccineRecord.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Cow Tag</th>
                <th className="py-2">Vaccine</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {vaccineRecord.map((record) => (
                <tr className="text-center" key={record._id}>
                  <td className="border px-4 py-2 font-bold">
                    {getCowTag(record.animalId)}
                  </td>

                  <td className="border px-4 py-2">{record.vaccineName}</td>
                  <td className="border px-4 py-2">
                    {formatDate(record.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No vaccination records found.</p>
        )}
      </div>
    </div>
  );
};

export default VaccinationRecordsPage;
