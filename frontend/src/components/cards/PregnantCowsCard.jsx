import React from "react";
import { useTheme } from "../../ThemeContext";

const PregnantCowsCard = ({ count, female, male }) => {
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
        <h4 className="text-2xl font-medium text-center">Pregnant Cows</h4>
        <hr className="h-px my-2 border-1 border-dashed border-blue-400"></hr>
        <h1 className="text-4xl font-bold text-center">{count}</h1>
        <h5 className="text-lg font-medium uppercase text-center">
          <span className="font-bold">Cows</span>
        </h5>
      </div>
    </>
  );
};

export default PregnantCowsCard;
