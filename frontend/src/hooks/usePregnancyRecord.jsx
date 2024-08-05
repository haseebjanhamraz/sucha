import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const usePregnancyRecord = (cowId) => {
  const { token } = useAuth();
  const [pregnancyRecord, setPregnancyRecord] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPregnancyRecord = async () => {
      if (!token) {
        setError("Authentication token not found.");
        setLoading(false);
        return;
      }

      if (!cowId) {
        setError("Cow ID not provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/inject-ai/${cowId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const pregnancy = response.data;
          setPregnancyRecord(pregnancy);
          const totalQuantity = pregnancy.reduce(
            (acc, record) => acc + record.quantity,
            0
          );

          setTotalQuantity(totalQuantity);
        } else {
          setError(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        setError(
          "Failed to fetch pregnancy records. Please check your network connection and authentication."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPregnancyRecord();
  }, [token, cowId]);

  return { pregnancyRecord, totalQuantity, loading, error };
};

export default usePregnancyRecord;
