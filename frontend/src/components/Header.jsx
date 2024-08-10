// src/components/Header.jsx
import React from "react";
import { useTheme } from "../ThemeContext";
import { FaRegSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";

const Header = (user) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold"></div>
      <div className="flex items-center">
        <button
          className="p-2 rounded-full text-gray-800 hover:bg-gray-100"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <FaMoon className="text-black text-2xl" />
          ) : (
            <FaRegSun className="text-yellow-400 text-2xl" />
          )}
        </button>
        <div className="ml-4">Hello, User</div>
        <img
          className="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/150"
          alt="User Avatar"
        />
      </div>
    </header>
  );
};

export default Header;
