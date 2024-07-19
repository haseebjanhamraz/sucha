import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useAISemens = () => {
  const { token } = useAuth();
  const [aisemens, setAISemens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAISemens = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/ai-semens",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAISemens(response.data);
      } catch (err) {
        setError(
          "Failed to fetch AI Semens. Please check your authentication."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAISemens();
    } else {
      setError("No authentication token found.");
      setLoading(false);
    }
  }, [token]);

  return { aisemens, loading, error };
};

export default useAISemens;
