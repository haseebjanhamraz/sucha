import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ toggleSidebar, isAuthenticated, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState("");

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center">
          <button className="sm:hidden mr-4" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          {isAuthenticated ? (
            <div className="relative">
              <button onClick={handleDropdownToggle}>
                <FaUserCircle className="w-8 h-8" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={onLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="text-sm bg-blue-700 px-4 py-2 rounded">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
