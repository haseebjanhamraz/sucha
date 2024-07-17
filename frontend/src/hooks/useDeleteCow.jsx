// useDeleteCow.js
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useDeleteCow = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteCow = async (cowId) => {
    setLoading(true);
    setError("");
    try {
      await axios.delete(`http://localhost:8080/api/animals/${cowId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError("Failed to delete cow. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteCow, loading, error };
};

export default useDeleteCow;
