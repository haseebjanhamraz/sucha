import { PiFarm } from "react-icons/pi";
import { useTheme } from "../ThemeContext";

const Error404 = () => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-900 text-blue-400"
            : "bg-gray-100 text-gray-800"
        }`}
      ></div>
      <div className="flex flex-col items-center justify-between">
        <PiFarm className="text-8xl" />
        <h1 className="text-2xl font-bold">No Records Found</h1>
        <button
          className={`mt-4 p-3 rounded-lg hover:opacity-70  ${
            theme === "dark"
              ? "bg-blue-900  text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          Add New
        </button>
      </div>
    </>
  );
};

export default Error404;
