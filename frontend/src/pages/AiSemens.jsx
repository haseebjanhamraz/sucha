import React from "react";
import useAISemens from "../hooks/useAISemens";

const AiSemens = () => {
  const { aisemens, loading, error } = useAISemens();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold uppercase text-center p-4">
        AI Semens
      </h1>
      <div className="flex gap-3">
        {aisemens.map((aisemen) => (
          <ul key={aisemen.id} className="w-fit rounded-lg border p-4 mb-4">
            <li className="text-center uppercase text-2xl font-bold">
              {aisemen.name}
            </li>
            <hr className="divide-y border-dashed m-2 divide-blue-200" />
            <li>
              Expiry:{" "}
              <span>{new Date(aisemen.expiryDate).toLocaleDateString()}</span>
            </li>
            <li>
              Barcode: <span>{aisemen.barcode}</span>
            </li>
            <div className="flex justify-center">
              <button className="bg-green-500 text-white p-2 rounded-lg mt-2">
                Edit
              </button>
              <button className="bg-red-500 text-white p-2 ml-4 rounded-lg mt-2">
                Delete
              </button>
            </div>
          </ul>
        ))}
      </div>
    </>
  );
};

export default AiSemens;
