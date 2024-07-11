// src/components/Dashboard.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../ThemeContext";

const Dashboard = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-blue-400"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
