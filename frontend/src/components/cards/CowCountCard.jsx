// CowCountCard.jsx
import React from "react";
import { useTheme } from "../../ThemeContext";

const CowCountCard = ({ count }) => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`
      w-64
      shadow-lg
      p-2
      rounded-lg
      ${
        theme === "dark"
          ? "bg-blue-600 text-white"
          : "bg-blue-200 text-blue-500"
      }`}
      >
        <h4 className="text-2xl font-medium text-center">Total Cows</h4>
        <hr className="h-px my-2 border-1 border-dashed border-blue-400"></hr>
        <h1 className="text-4xl font-bold text-center">{count}</h1>
      </div>
    </>
  );
};

export default CowCountCard;
