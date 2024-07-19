import React from "react";

// http://localhost:8080/api/ai-semens

const AiSemens = () => {
  return (
    <>
      <h1 className="text-4xl font-bold uppercase text-center p-4">
        AI Semens
      </h1>
      <div className="">
        <ul className="w-fit rounded-lg border p-4">
          <li className="text-center uppercase text-2xl font-bold">
            Semen Name
          </li>
          <hr className="divide-y border-dashed m-2 divide-blue-200" />
          <li>
            Expiry: <span>20/12/2024</span>{" "}
          </li>
          <li>
            Barcode: <span>12a9012830998</span>{" "}
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
      </div>
    </>
  );
};

export default AiSemens;
