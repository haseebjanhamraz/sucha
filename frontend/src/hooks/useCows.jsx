// useCows.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useCows = () => {
  const { token } = useAuth();
  const [cows, setCows] = useState([]);
  const [pregnantCows, setPregnantCows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/animals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data;
        console.log(data);

        setCows(data);
      } catch (err) {
        setError("Failed to fetch cows. Please check your authentication.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCows();
    } else {
      setError("No authentication token found.");
      setLoading(false);
    }
  }, [token]);

  return { cows, loading, error };
};

export default useCows;
