import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useManageMilkRecords = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addMilkRecord = async (newRecord) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/milk-records/",
        newRecord,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError("Failed to add milk record. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMilkRecord = async (recordId, updatedData) => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/milk-records/${recordId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      setError("Failed to update milk record. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteMilkRecord = async (recordId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/milk-records/${recordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError("Failed to delete milk record. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addMilkRecord, updateMilkRecord, deleteMilkRecord, loading, error };
};

export default useManageMilkRecords;
