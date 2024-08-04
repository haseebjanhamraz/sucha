// src/components/Dashboard.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../ThemeContext";

const Dashboard = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex sticky-top h-screen overflow-auto ${
        theme === "dark"
          ? "bg-gray-900 text-blue-400"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main
          className={`flex-1 p-6 border-2 ${
            theme === "dark" ? "border-2 border-blue-800" : "border-gray-200"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
