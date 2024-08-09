// src/pages/VaccinationRecordsPage.jsx
import React, { useState } from "react";
import axios from "axios";
import useVaccineRecords from "../hooks/useVaccineRecords";
import useCows from "../hooks/useCows";
import useVaccines from "../hooks/useVaccines";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";
import { SnackbarProvider, useSnackbar } from "notistack";

const VaccinationRecordsPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    vaccineRecord,
    setVaccineRecord,
    error: vaccineRecordsError,
  } = useVaccineRecords();
  const { cows, error: cowsError } = useCows();
  const { vaccines, error: vaccinesError } = useVaccines();
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
    setError(""); // Clear error before new attempt
    setSuccess(""); // Clear success before new attempt

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

      if (response.status === 201) {
        setVaccineRecord((prevRecords) => [...prevRecords, response.data]);
        setSuccess("Vaccine record added successfully!");
        enqueueSnackbar("Vaccine record added successfully!", {
          variant: "success",
          autoHideDuration: 3000,
        });
        setNewVaccineRecord({ animalId: "", vaccine: "", date: "" });
      } else {
        throw new Error("Failed to add vaccine record.");
      }
    } catch (err) {
      console.error("Error adding vaccine record:", err);
      setError("Failed to add vaccine record.");
      enqueueSnackbar("Failed to add vaccine record.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const getCowTag = (animalId) => {
    const cow = cows.find((cow) => cow._id === animalId);
    return cow ? cow.tag : "Unknown";
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Vaccination Records</h1>
      {error && <p className="text-red-500">{error}</p>}

      {vaccineRecordsError && (
        <p className="text-red-500">{vaccineRecordsError}</p>
      )}
      {cowsError && <p className="text-red-500">{cowsError}</p>}
      {vaccinesError && <p className="text-red-500">{vaccinesError}</p>}
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-4 md:flex-row md:items-center"
      >
        <select
          name="animalId"
          value={newVaccineRecord.animalId}
          onChange={handleChange}
          className="border p-2 md:mr-2"
          required
        >
          <option value="" disabled>
            Select Cattle
          </option>
          {cows.map((cow) => (
            <option key={cow._id} value={cow._id}>
              {cow.tag}
            </option>
          ))}
        </select>
        <select
          name="vaccine"
          value={newVaccineRecord.vaccine}
          onChange={handleChange}
          className="border p-2 md:mr-2"
          required
        >
          <option value="" disabled>
            Select Vaccine
          </option>
          {vaccines.map((vaccine) => (
            <option key={vaccine._id} value={vaccine._id}>
              {vaccine.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={newVaccineRecord.date}
          onChange={handleChange}
          className="border p-2 md:mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4 md:mt-0"
        >
          Add Vaccine Record
        </button>
      </form>
      <div>
        {vaccineRecord.length > 0 ? (
          <table className="min-w-full ">
            <thead>
              <tr>
                <th className="py-2 border-2 bg-blue-600 bg-opacity-30">
                  Cow Tag
                </th>
                <th className="py-2 border-2 bg-blue-600 bg-opacity-30">
                  Vaccine
                </th>
                <th className="py-2 border-2 bg-blue-600 bg-opacity-30">
                  Date
                </th>
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

const VaccinationRecordsPageWrapper = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
    <VaccinationRecordsPage />
  </SnackbarProvider>
);

export default VaccinationRecordsPageWrapper;
