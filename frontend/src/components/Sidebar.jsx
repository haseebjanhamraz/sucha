// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold">Dairy Farm Management</div>
      <nav className="flex flex-col mt-4">
        <Link to="/" className="p-4 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/cows" className="p-4 hover:bg-gray-700">
          Cows
        </Link>
        <Link to="/milking-records" className="p-4 hover:bg-gray-700">
          Milking Records
        </Link>
        <Link to="/vaccination-records" className="p-4 hover:bg-gray-700">
          Vaccination Records
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
