import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLoginSuccess = (token) => {
    sessionStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar
          toggleSidebar={toggleSidebar}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <div className="flex flex-1">
          {isAuthenticated && <Sidebar isOpen={sidebarOpen} />}
          <main className="flex-1 p-6 bg-gray-100">
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Login onLoginSuccess={handleLoginSuccess} />
                  )
                }
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
