// useManageVaccines.js
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useManageVaccines = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateVaccine = async (id, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/vaccines/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError("Failed to update vaccine. Please try again.");
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
    } finally {
      setLoading(false);
    }
  };

  return { updateVaccine, deleteVaccine, loading, error };
};

export default useManageVaccines;
