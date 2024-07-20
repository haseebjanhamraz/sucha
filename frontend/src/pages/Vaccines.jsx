import React from "react";
import useVaccines from "../hooks/useVaccines";
import useManageVaccines from "../hooks/useManageVaccines";

const Vaccines = () => {
  const {
    vaccines,
    loading: vaccinesLoading,
    error: vaccinesError,
  } = useVaccines();
  const {
    updateVaccine,
    deleteVaccine,
    loading: manageLoading,
    error: manageError,
  } = useManageVaccines();

  if (vaccinesLoading || manageLoading) {
    return <div>Loading...</div>;
  }

  if (vaccinesError || manageError) {
    return <div>{vaccinesError || manageError}</div>;
  }

  const handleUpdate = (vaccineId) => {
    const updatedData = {
      /* new data for the vaccine */
    };
    updateVaccine(vaccineId, updatedData);
  };

  const handleDelete = (vaccineId) => {
    deleteVaccine(vaccineId);
  };

  return (
    <>
      <h1 className="text-4xl font-bold uppercase text-center p-4">Vaccines</h1>
      <div className="flex gap-3">
        {vaccines.map((vaccine) => (
          <ul key={vaccine._id} className="w-fit rounded-lg border p-4 mb-4">
            <li className="text-center uppercase text-2xl font-bold">
              {vaccine.name}
            </li>
            <hr className="divide-y border-dashed m-2 divide-blue-200" />
            <li>
              Expiry:{" "}
              <span>{new Date(vaccine.expiryDate).toLocaleDateString()}</span>
            </li>
            <li>
              Barcode: <span>{vaccine.barcode}</span>
            </li>
            <div className="flex justify-center">
              <button
                onClick={() => handleUpdate(vaccine.id)}
                className="bg-green-500 text-white p-2 rounded-lg mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(vaccine.id)}
                className="bg-red-500 text-white p-2 ml-4 rounded-lg mt-2"
              >
                Delete
              </button>
            </div>
          </ul>
        ))}
      </div>
    </>
  );
};

export default Vaccines;
