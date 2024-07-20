// useFemaleCows.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useFemaleCows = () => {
  const { token } = useAuth();
  const [femaleCows, setFemaleCows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFemaleCows = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/animals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cows = response.data.data.filter((cow) => cow.sex === "female");
        setFemaleCows(cows);
      } catch (err) {
        setError(
          "Failed to fetch female cows. Please check your authentication."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchFemaleCows();
    } else {
      setError("No authentication token found.");
      setLoading(false);
    }
  }, [token]);

  return { femaleCows, loading, error };
};

export default useFemaleCows;
