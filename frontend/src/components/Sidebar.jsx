// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
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
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`h-full bg-gray-800 text-white flex flex-col 
        ${isCollapsed ? "w-20" && "items-center" : "w-64"}`}
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
      <div className="flex items-end justify-end p-4 px-8 h-full mb-5">
        <div
          className="flex items-center gap-4 bg-slate-500 hover:bg-red-500 p-2 cursor-pointer rounded-lg"
          onClick={handleLogout}
        >
          {isCollapsed ? <CiLogout /> : <p>Logout</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
