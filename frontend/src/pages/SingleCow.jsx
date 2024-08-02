import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";
import { useTheme } from "../ThemeContext";
import useSingleMilkRecord from "../hooks/useSingleMilkRecord";
import CowDetails from "../components/CowDetails";
import MilkRecords from "../components/MilkRecords";
import VaccinationRecords from "../components/VaccinationRecords";

const SingleCowPage = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const { token } = useAuth();
  const [cow, setCow] = useState(null);
  const [vaccineRecord, setVaccineRecord] = useState(null);
  const [error, setError] = useState("");

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

        const vaccineRecords = response.data;
        const vaccineIds = vaccineRecords.map((record) => record.vaccine);

        const fetchVaccineNames = async () => {
          try {
            const responses = await Promise.all(
              vaccineIds.map((vaccineId) =>
                axios.get(`http://localhost:8080/api/vaccines/${vaccineId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
              )
            );
            const vaccineData = responses.map((res) => res.data);
            const vaccineRecordsWithNames = vaccineRecords.map(
              (record, index) => ({
                ...record,
                vaccineName: vaccineData[index].name,
              })
            );
            setVaccineRecord(vaccineRecordsWithNames);
          } catch (err) {
            setError("Failed to fetch vaccine names.");
          }
        };

        fetchVaccineNames();
      } catch (err) {
        setError("Failed to fetch vaccine records.");
      }
    };

    fetchCow();
    fetchVaccineRecord();
  }, [id, token]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!cow) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex lg:flex-nowrap md:flex-wrap flex-wrap w-full mx-auto p-4 ${
        theme === "dark"
          ? "bg-gray-900 text-blue-400"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <BackButton />
      <CowDetails cow={cow} totalQuantity={totalQuantity} />
      <MilkRecords
        milkRecords={milkRecords}
        milkLoading={milkLoading}
        milkError={milkError}
      />
      <VaccinationRecords vaccineRecord={vaccineRecord} />
    </div>
  );
};

export default SingleCowPage;
