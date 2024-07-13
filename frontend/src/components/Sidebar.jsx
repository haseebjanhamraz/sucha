// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GiCow } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import { BiInjection } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../ThemeContext";

const sidebarItems = [
  { to: "/", icon: MdDashboard, label: "Dashboard" },
  { to: "/cows", icon: GiCow, label: "Cows" },
  { to: "/milking-records", icon: LuMilk, label: "Milking" },
  { to: "/vaccination-records", icon: BiInjection, label: "Vaccination" },
];

const Sidebar = () => {
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(
    window.innerWidth < 768 && localStorage.getItem("sidebar")
  );
  const location = useLocation();
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
      className={`h-full border-2 ${
        theme === "dark"
          ? "bg-gray-900 text-blue-400 border-blue-500 "
          : "bg-blue-500 text-white"
      }  flex flex-col ${isCollapsed ? "w-20 items-center" : "w-64"}`}
    >
      <div className="flex justify-end p-2">
        <button onClick={toggleSidebar} className="text-xl">
          {isCollapsed ? <FiMenu /> : <IoClose />}
        </button>
      </div>
      <div className="p-3 text-lg font-bold flex justify-center items-center">
        {!isCollapsed ? (
          <div className="flex flex-col items-center">
            <img src="/logo.png" width={"100px"} />
            <span className="uppercase">Sucha Dairy Farm</span>
            <p className="text-sm font-sans font-normal">
              Farm Management System
            </p>
          </div>
        ) : (
          <img src="/logo.png" />
        )}
      </div>

      <nav className="flex flex-col mt-4">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`p-4 border-[0.5px] border-blue-500 hover:bg-blue-900 hover:text-white flex items-center ${
              location.pathname === item.to ? "bg-blue-600 text-white" : ""
            }`}
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
