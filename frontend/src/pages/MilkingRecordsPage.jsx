// MilkingRecordsPage.jsx
import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import useMilkRecords from "../hooks/useMilkRecords";
import { formatDate } from "../utils/formatDate";
import Error404 from "../components/Error404";

const MilkingRecordsPage = () => {
  const { theme } = useTheme();
  const { milkRecords, totalQuantity, loading, error } = useMilkRecords();
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        <Error404 />
      </div>
    );

  const filteredMilkRecords = milkRecords.filter((record) =>
    record.animalId?.tag.toLowerCase().includes(searchInput.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMilkRecords.length / pageSize);
  const displayedMilk = filteredMilkRecords.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-900 text-blue-400"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">
          Milk Records
          <span className="inline-flex items-center rounded-md bg-blue-50 mx-1 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
            {totalQuantity}
          </span>
        </h1>

        <input
          type="text"
          placeholder="Search by tag"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 overflow-x-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">S.No</th>
                <th className="border border-gray-300 p-2">Tag#</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2 hidden sm:table-cell">
                  Time
                </th>
                <th className="border border-gray-300 p-2 hidden sm:table-cell">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {displayedMilk.map((milk, index) => (
                <tr key={milk._id} className="border border-gray-300">
                  <td className="border border-gray-300 p-2">
                    {currentPage * pageSize + index + 1}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {milk.animalId ? milk.animalId.tag : "Animal ID not found"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formatDate(milk.date)}
                  </td>
                  <td className="border border-gray-300 p-2 hidden sm:table-cell">
                    {milk.time}
                  </td>
                  <td className="border border-gray-300 p-2 hidden sm:table-cell">
                    {milk.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="border border-gray-300 p-2 font-bold">Total</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2 hidden sm:table-cell"></td>
                <td className="border border-gray-300 p-2 hidden sm:table-cell"></td>
                <td className="border border-gray-300 p-2 hidden sm:table-cell font-bold">
                  {totalQuantity}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <span>
            Page{" "}
            <strong>
              {currentPage + 1} of {totalPages}
            </strong>
          </span>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="mr-2 p-2 bg-gray-300 rounded"
            >
              {"<"}
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className="p-2 bg-gray-300 rounded"
            >
              {">"}
            </button>
          </div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0); // Reset to first page
            }}
            className="ml-4 p-2 border border-gray-300 rounded"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default MilkingRecordsPage;
