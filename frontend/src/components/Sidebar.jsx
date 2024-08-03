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
import { PiDnaBold } from "react-icons/pi";
import { GrCertificate } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const sidebarItems = [
  { to: "/", icon: MdDashboard, label: "Dashboard" },
  {
    to: "/cows",
    icon: GiCow,
    label: "Cattle",
    subItems: [
      { to: "/cows/pushai", icon: PiDnaBold, label: "Push AI Semens" },
      {
        to: "/cows/inject-vaccines",
        icon: BiInjection,
        label: "Inject Vaccines",
      },
      {
        to: "/cows/pregnant-cows",
        icon: GiCow,
        label: "Pregnant Cows",
      },
      {
        to: "/cows/pedigree-certificate",
        icon: GrCertificate,
        label: "Pedigree Certificate",
      },
    ],
  },
  {
    to: "/milking-records",
    icon: LuMilk,
    label: "Milking",
    subItems: [
      {
        to: "/milking-records/add",
        icon: IoMdSettings,
        label: "Add Milk Record",
      },
    ],
  },
  {
    to: "/settings",
    icon: IoMdSettings,
    label: "Settings",
    subItems: [
      { to: "/settings/profile", icon: FaUserCircle, label: "Profile" },
      { to: "/settings/vaccines", icon: BiInjection, label: "Vaccines" },
      { to: "/settings/ai-semens", icon: PiDnaBold, label: "AI Semens" },
    ],
  },
];

const Sidebar = () => {
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(
    window.innerWidth < 768 && localStorage.getItem("sidebar")
  );
  const location = useLocation();
  const { logout } = useAuth();
  const [activeItem, setActiveItem] = useState(null);

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

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`h-screen border-2 ${
        theme === "dark"
          ? "bg-gray-900 text-blue-400 border-blue-500 "
          : "bg-blue-500 text-white"
      } flex flex-col ${isCollapsed ? "w-20 items-center" : "w-64"}`}
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
              Records Management System
            </p>
          </div>
        ) : (
          <img src="/logo.png" />
        )}
      </div>

      <nav className="flex flex-col mt-4">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            <Link
              to={item.to}
              className={`p-2 border-[0.5px] border-blue-500 hover:bg-blue-900 hover:text-white flex items-center ${
                (item.to === "/" && location.pathname === "/") ||
                (item.to !== "/" && location.pathname.startsWith(item.to))
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
              onClick={() => setActiveItem(item.to)}
            >
              <item.icon className="text-2xl" />
              {!isCollapsed && <p className="ml-2 text-lg">{item.label}</p>}
            </Link>
            {activeItem &&
              activeItem.startsWith(item.to) &&
              item.subItems &&
              item.subItems.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  to={subItem.to}
                  className={`p-2 pl-10  hover:bg-blue-700 hover:text-white flex items-center ${
                    location.pathname === subItem.to
                      ? ` ${
                          theme === "dark"
                            ? "bg-blue-500 text-white"
                            : "bg-blue-700 text-white"
                        }`
                      : ""
                  }`}
                >
                  <subItem.icon className="text-lg" />
                  {!isCollapsed && (
                    <p className="ml-2 text-sm">{subItem.label}</p>
                  )}
                </Link>
              ))}
          </div>
        ))}
      </nav>
      <div className="flex items-end justify-end p-4 px-8 h-full mb-5">
        <div
          className="text-white hover:text-red-500 flex items-center gap-4 hover:bg-slate-300 bg-red-500 p-2 cursor-pointer rounded-lg"
          onClick={handleLogout}
        >
          {isCollapsed ? <CiLogout /> : <p>Logout</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
