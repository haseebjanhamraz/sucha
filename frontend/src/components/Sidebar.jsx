// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GiCow } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import { BiInjection } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";

const sidebarItems = [
  { to: "/", icon: MdDashboard, label: "Dashboard" },
  { to: "/cows", icon: GiCow, label: "Cows" },
  { to: "/milking-records", icon: LuMilk, label: "Milking" },
  { to: "/vaccination-records", icon: BiInjection, label: "Vaccination" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={`h-full bg-gray-800 text-white flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 text-lg font-bold flex justify-between items-center">
        {!isCollapsed && <span>Dairy Farm</span>}
        <button onClick={toggleSidebar} className="text-xl">
          {isCollapsed ? <FiMenu /> : <IoClose />}
        </button>
      </div>
      <nav className="flex flex-col mt-4">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="p-4 hover:bg-gray-700 flex items-center"
          >
            <item.icon className="text-2xl" />
            {!isCollapsed && <p className="ml-2 text-lg">{item.label}</p>}
          </Link>
        ))}
      </nav>
      <CiLogout onClick={handleLogout} />
    </div>
  );
};

export default Sidebar;
