import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
    sessionStorage.setItem("token", userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("token");
  };

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
