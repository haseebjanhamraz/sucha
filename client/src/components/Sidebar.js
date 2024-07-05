import React from "react";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`w-64 bg-gray-800 text-white ${
        isOpen ? "block" : "hidden"
      } sm:block`}
    >
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        <ul>
          <li className="mb-2">
            <a href="/" className="hover:bg-gray-700 px-4 py-2 block rounded">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/analytics"
              className="hover:bg-gray-700 px-4 py-2 block rounded"
            >
              Analytics
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/settings"
              className="hover:bg-gray-700 px-4 py-2 block rounded"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
