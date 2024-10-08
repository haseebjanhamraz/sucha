import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useManageVaccines = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addVaccine = async (newVaccine) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/vaccines",
        newVaccine,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError("Failed to add vaccine. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateVaccine = async (vaccineId, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/vaccines/${vaccineId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError("Failed to update vaccine. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteVaccine = async (vaccineId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/vaccines/${vaccineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError("Failed to delete vaccine. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addVaccine, updateVaccine, deleteVaccine, loading, error };
};

export default useManageVaccines;
