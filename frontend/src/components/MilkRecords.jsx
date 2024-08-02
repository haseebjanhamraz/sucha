// src/components/MilkRecords.jsx
import React, { useState } from "react";
import { formatDate } from "../utils/formatDate";

const MilkRecords = ({ milkRecords, milkLoading, milkError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = milkRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(milkRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (milkError) {
    return <div className="text-red-500">{milkError}</div>;
  }

  if (milkLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CowDetails w-full border-2 p-4 m-4 rounded-md">
      <h2 className="text-2xl font-bold text-center m-5">Milk Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 overflow-x-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">S.No</th>
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
            {currentRecords.map((record, index) => (
              <tr key={record._id} className="border border-gray-300">
                <td className="border border-gray-300 p-2">
                  {indexOfFirstRecord + index + 1}
                </td>
                <td className="border border-gray-300 p-2">
                  {formatDate(record.date)}
                </td>
                <td className="border border-gray-300 p-2 hidden sm:table-cell">
                  {record.time}
                </td>
                <td className="border border-gray-300 p-2 hidden sm:table-cell">
                  {record.quantity}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">Total</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2 hidden sm:table-cell"></td>
              <td className="border border-gray-300 p-2 hidden sm:table-cell">
                {milkRecords.reduce(
                  (total, record) => total + record.quantity,
                  0
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="pagination mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 mx-1 border ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MilkRecords;
