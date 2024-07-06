import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { FaCow } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import { AiOutlineMenuUnfold } from "react-icons/ai";

const navItems = [
  { path: "/", label: "Dashboard", icon: MdDashboard },
  { path: "/cows", label: "Cows", icon: FaCow },
  { path: "/analytics", label: "Analytics", icon: IoMdAnalytics },
  { path: "/settings", label: "Settings", icon: IoMdSettings },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(true);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div
        className={`w-64 bg-gray-800 text-white transform sm:translate-x-0 transition-transform duration-300 ease-in-out fixed sm:relative z-10`}
        style={{
          width: isClicked ? "auto" : "fit",
        }}
      >
        <div className="p-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`text-md font-bold block p-2 rounded hover:bg-blue-700 ${
                location.pathname === item.path ? "bg-blue-700" : "bg-gray-800"
              }`}
            >
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <item.icon className="mr-2" size={20} />
                  <span
                    style={{
                      display: isClicked ? "block" : "none",
                    }}
                  >
                    {" "}
                    {item.label}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2"></div>
              </div>
            </Link>
          ))}
          <FaWindowClose
            cursor="pointer"
            onClick={handleClick}
            className=" text-2xl absolute inset-x-32 bottom-2 h-16"
            style={{
              display: isClicked ? "block" : "none",
            }}
          />
          <AiOutlineMenuUnfold
            cursor="pointer"
            onClick={handleClick}
            className="text-2xl absolute inset-x-5 bottom-2 h-16 transition-[width]"
            style={{
              display: isClicked ? "none" : "block",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
