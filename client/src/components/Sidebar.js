import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/cows", label: "Cows" },
  { path: "/analytics", label: "Analytics" },
  { path: "/settings", label: "Settings" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="sm:hidden p-4 bg-blue-600 text-white fixed top-0 left-0 z-20"
      >
        {isOpen ? "Close" : "Open"}
      </button>
      <aside
        className={`w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 ease-in-out fixed sm:relative z-10`}
      >
        <div className="p-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`text-lg font-semibold block p-2 rounded hover:bg-blue-700 ${
                location.pathname === item.path ? "bg-blue-700" : "bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
