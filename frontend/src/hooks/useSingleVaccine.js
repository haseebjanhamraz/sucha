// src/hooks/useSingleVaccine.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useSingleVaccine = (vaccineId) => {
  const { token } = useAuth();
  const [vaccine, setVaccine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVaccine = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/vaccines/${vaccineId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVaccine(response.data);
      } catch (err) {
        setError("Failed to fetch vaccine. Please check your authentication.");
      } finally {
        setLoading(false);
      }
    };

    if (token && vaccineId) {
      fetchVaccine();
    } else {
      setError("No authentication token or vaccine ID found.");
      setLoading(false);
    }
  }, [token, vaccineId]);

  return { vaccine, loading, error };
};

export default useSingleVaccine;
