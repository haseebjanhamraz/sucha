// src/components/CowDetails.jsx
import { React, useState } from "react";

const CowPregnancyRecord = ({ cow }) => {
  const { pregnancy, setPregnancy } = useState("true");

  let detailItems = {
    Pregnancy: "",
    "Pregnancy Count": cow.pregnancyCount,
  };

  if (cow.pregnant) {
    detailItems.Pregnancy = "Yes";
  } else {
    detailItems.Pregnancy = "No";
  }

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
            <hr className="border-2  m-2" />
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default CowPregnancyRecord;
