// src/hooks/useVaccineRecords.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useVaccineRecords = (id = "") => {
  const { token } = useAuth();
  const [vaccineRecord, setVaccineRecord] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVaccineRecord = async () => {
      try {
        const url = id
          ? `http://localhost:8080/api/vaccine-records/${id}`
          : `http://localhost:8080/api/vaccine-records/`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    fetchVaccineRecord();
  }, [id, token]);

  return { vaccineRecord, error };
};

export default useVaccineRecords;
