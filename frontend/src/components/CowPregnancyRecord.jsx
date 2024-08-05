import React from "react";

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
          <ul key={i}>
            <li className="text-md text-gray-500 text-center">
              {key}
              {": "}
              <span className="text-green-600 font-bold capitalize">{val}</span>
            </li>
            <hr className="border-2 m-2" />
          </ul>
        ))}
      </ul>

      {pregnancyRecord.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">Insemination Date</th>
                <th className="py-2 px-4 border">Semen Type</th>
              </tr>
            </thead>
            <tbody>
              {pregnancyRecord.map((record) => (
                <tr key={record._id}>
                  <td className="py-2 px-4 border">{record.date}</td>
                  <td className="py-2 px-4 border">{record.semen}</td>
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
