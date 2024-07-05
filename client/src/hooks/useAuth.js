import { useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/auth";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, handleLoginSuccess, handleLogout };
};

export default useAuth;
