// useSingleMilkRecord.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useSingleMilkRecord = (cowId) => {
  const { token } = useAuth();
  const [milkRecords, setMilkRecords] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMilkRecords = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/milk-records/${cowId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const milk = response.data || [];
        setMilkRecords(milk);
        const totalQuantity = milk.reduce(
          (acc, record) => acc + record.quantity,
          0
        );
        setTotalQuantity(totalQuantity);
      } catch (err) {
        setError(
          "Failed to fetch milk records. Please check your authentication."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token && cowId) {
      fetchMilkRecords();
    } else {
      setError("No authentication token or cow ID found.");
      setLoading(false);
    }
  }, [token, cowId]);

  return { milkRecords, totalQuantity, loading, error };
};

export default useSingleMilkRecord;
