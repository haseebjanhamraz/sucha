// src/hooks/useValidateToken.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useValidateToken = () => {
  const { token, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) return;

      setLoading(true);
      setError("");
      try {
        await axios.post(
          "http://localhost:8080/api/auth/validate-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        if (err.response && err.response.status === 401) {
          logout();
          window.location.href = "/login";
        } else {
          setError("Token validation failed");
        }
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token, logout]);

  return { loading, error };
};

export default useValidateToken;
