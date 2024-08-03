// src/components/CowDetails.jsx
import React from "react";
import { formatDate } from "../utils/formatDate";
import { calculateFullAge } from "../utils/calculateAge";

const CowDetails = ({ cow, totalQuantity }) => {
  let detailItems = {
    Tag: cow.tag,
    Breed: cow.breed,
    DOB: formatDate(cow.dob),
    Age: calculateFullAge(cow.dob),
    Dam: cow.dam,
    Sire: cow.sire,
    Sex: cow.sex,
    Color: cow.color,
    "Totla Milk": totalQuantity,
  };
  return (
    <div className="border-2 p-4 m-4 rounded-md">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center uppercase">
        Cattle Record
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

export default CowDetails;
