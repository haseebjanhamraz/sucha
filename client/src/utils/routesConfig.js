// src/routesConfig.js
import { Navigate } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import Cows from "../pages/Cows";

const routesConfig = [
  {
    path: "/login",
    element: (isAuthenticated, handleLoginSuccess) =>
      isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      ),
  },
  {
    path: "/register",
    element: () => <Register />,
  },
  {
    path: "/",
    element: (isAuthenticated) =>
      isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
  },
  {
    path: "/cows",
    element: (isAuthenticated) =>
      isAuthenticated ? <Cows /> : <Navigate to="/cows" />,
  },
  {
    path: "/analytics",
    element: (isAuthenticated) =>
      isAuthenticated ? <Analytics /> : <Navigate to="/login" />,
  },
  {
    path: "/settings",
    element: (isAuthenticated) =>
      isAuthenticated ? <Settings /> : <Navigate to="/login" />,
  },
];

export default routesConfig;
