// src/components/CowDetails.jsx
import React from "react";
import { formatDate } from "../utils/formatDate";
import { calculateFullAge } from "../utils/calculateAge";

const CowDetails = ({ cow, totalQuantity }) => {
  return (
    <div className="CowDetails border-2 p-4 m-4 rounded-md">
      <h2 className="text-2xl font-bold text-center m-5">Cow Details</h2>
      <p className={`border-2 mt-2 text-lg p-2 rounded-lg font-medium`}>
        Tag: {cow.tag}
      </p>
      <p className={`border-2 mt-2 text-lg p-2 rounded-lg font-medium`}>
        Breed: {cow.breed}
      </p>
      <p className={`border-2 mt-2 text-lg p-2 rounded-lg font-medium`}>
        DOB: {formatDate(cow.dob)}
      </p>
      <p className={`border-2 mt-2 text-lg p-2 rounded-lg font-medium`}>
        Age: {calculateFullAge(cow.dob)}
      </p>
      <p className={`border-2 mt-2 text-lg p-2 rounded-lg font-medium`}>
        Dam: {cow.dam}
      </p>
      <p className={`border-2 mt-2 text-lg p-2 rounded-lg font-medium`}>
        Sire: {cow.sire}
      </p>
      <p className={`border-2 mt-2 text-lg p-2 rounded-lg font-medium`}>
        Sex: {cow.sex}
      </p>
      <p className={`border-2 mt-2 text-lg p-2 rounded-lg font-medium`}>
        Color: {cow.color}
      </p>
      <p className={`border-2 mt-2 text-lg p-2 rounded-lg font-medium`}>
        Total Milk: <span className="font-bold">{totalQuantity} Ltrs</span>
      </p>
    </div>
  );
};

export default CowDetails;
