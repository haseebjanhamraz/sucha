// useVaccines.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useVaccines = () => {
  const { token } = useAuth();
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    () => {
      const fetchVaccines = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/vaccines",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setVaccines(response.data);
        } catch (err) {
          setError(
            "Failed to fetch vaccines. Please check your authentication."
          );
        } finally {
          setLoading(false);
        }
      };

      if (token) {
        fetchVaccines();
      } else {
        setError("No authentication token found.");
        setLoading(false);
      }
    },
    [vaccines],
    [token]
  );

  return { vaccines, loading, error };
};

export default useVaccines;
