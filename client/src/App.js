import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useAuth from "./hooks/useAuth";
import routesConfig from "./utils/routesConfig";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, handleLoginSuccess, handleLogout } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
              {routesConfig.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element(isAuthenticated, handleLoginSuccess)}
                />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
