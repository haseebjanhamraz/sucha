import React from "react";
import { formatDate } from "../utils/formatDate";
const CowPregnancyRecord = ({ cow, pregnancyRecord }) => {
  const detailItems = {
    Pregnancy: cow.pregnant ? "Yes" : "No",
    "Pregnancy Count": cow.pregnancyCount,
  };

  return (
    <div className="border-2 p-4 m-4 rounded-md">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center">
        Pregnancy Record
      </h2>
      <hr className="border-4 mb-12 mt-2" />
      <ul>
        {Object.entries(detailItems).map(([key, val], i) => (
          <li key={i}>
            <p className="text-md text-gray-500 text-center">
              {key}:{" "}
              <span className="text-green-600 font-bold capitalize">{val}</span>
            </p>
            <hr className="border-2 m-2" />
          </li>
        ))}
      </ul>

      {pregnancyRecord.length > 0 ? (
        <div className="overflow-x-auto m-3">
          <table className="min-w-full border">
            <thead className="">
              <tr>
                <th className="py-2 px-4 border">Semen Name</th>
                <th className="py-2 px-4 border">AI Date</th>
              </tr>
            </thead>
            <tbody>
              {pregnancyRecord.map((record) => (
                <tr key={record._id}>
                  <td className="py-2 font-bold px-4 border text-center">
                    {record.semenName}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {formatDate(record.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500">
          No pregnancy records available.
        </p>
      )}
    </div>
  );
};

export default CowPregnancyRecord;
