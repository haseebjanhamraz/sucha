import React from "react";
import { Link, useLocation } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { FaCow } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";

const navItems = [
  { path: "/", label: "Dashboard", icon: MdDashboard },
  { path: "/cows", label: "Cows", icon: FaCow },
  { path: "/analytics", label: "Analytics", icon: IoMdAnalytics },
  { path: "/settings", label: "Settings", icon: IoMdSettings },
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
              <div className="flex gap-2 items-center">
                <item.icon className="mr-2" size={20} />
                {item.label}
              </div>
            </Link>
          ))}
          <FaWindowClose
            onClick={toggleSidebar}
            className="sm:block text-2xl absolute inset-x-48 bottom-2 h-16"
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
