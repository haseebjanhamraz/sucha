// src/pages/SingleCowPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";
import { useTheme } from "../ThemeContext";
import useSingleMilkRecord from "../hooks/useSingleMilkRecord";
import useVaccineRecords from "../hooks/useVaccineRecords";
import CowDetails from "../components/CowDetails";
import MilkRecords from "../components/MilkRecords";
import VaccinationRecords from "../components/VaccinationRecords";
import CowPregnancyRecord from "../components/CowPregnancyRecord";

const SingleCowPage = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const { token } = useAuth();
  const [cow, setCow] = useState(null);
  const [pregnancyRecord, setPregnancyRecord] = useState([]);
  const [error, setError] = useState("");

  const {
    milkRecords,
    totalQuantity,
    loading: milkLoading,
    error: milkError,
  } = useSingleMilkRecord(id);
  const { vaccineRecord, error: vaccineError } = useVaccineRecords(id);

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

    const fetchPregnancyRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/inject-ai/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const pregnancyRecord = response.data;
        const semenIds = pregnancyRecord.map((record) => record.semen);

        const fetchSemenNames = async () => {
          try {
            const responses = await Promise.all(
              semenIds.map((semenId) =>
                axios.get(`http://localhost:8080/api/ai-semens/${semenId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
              )
            );
            const semenData = responses.map((res) => res.data);
            const pregnancyRecordsWithSemenNames = pregnancyRecord.map(
              (record, index) => ({
                ...record,
                semenName: semenData[index].name,
              })
            );
            setPregnancyRecord(pregnancyRecordsWithSemenNames);
          } catch (err) {
            setError("Failed to fetch semen names.");
          }
        };

        fetchSemenNames();
      } catch (err) {
        setError("Failed to fetch pregnancy records.");
      }
    };

    fetchCow();
    fetchPregnancyRecord();
  }, [id, token]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!cow) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BackButton />
      <div
        className={`grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:flex-nowrap md:flex-wrap flex-wrap w-full mx-auto p-4 ${
          theme === "dark"
            ? "bg-gray-900 text-blue-400"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <CowDetails cow={cow} totalQuantity={totalQuantity} />
        <MilkRecords
          milkRecords={milkRecords}
          milkLoading={milkLoading}
          milkError={milkError}
        />
        <VaccinationRecords
          vaccineRecord={vaccineRecord}
          error={vaccineError}
        />
        <CowPregnancyRecord cow={cow} pregnancyRecord={pregnancyRecord} />
      </div>
    </>
  );
};

export default SingleCowPage;
