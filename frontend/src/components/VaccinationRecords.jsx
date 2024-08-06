// src/components/VaccinationRecords.jsx
import React from "react";
import { formatDate } from "../utils/formatDate";

const VaccinationRecords = ({ vaccineRecord }) => {
  if (!vaccineRecord) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full border-2 p- m-4 rounded-md">
      <h2 className="text-2xl font-bold text-center m-5">
        Vaccination Records
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 overflow-x-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 hidden sm:table-cell">
                Vaccine
              </th>
              <th className="border border-gray-300 p-2">Injected On</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {vaccineRecord.map((vaccine, index) => (
              <tr key={vaccine._id} className="border border-gray-300">
                <td className="border border-gray-300 p-2 hidden sm:table-cell">
                  {vaccine.vaccineName}
                </td>
                <td className="border border-gray-300 p-2">
                  {formatDate(vaccine.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VaccinationRecords;
