import { useState } from "react";
import useVaccines from "../hooks/useVaccines";
import useManageVaccines from "../hooks/useManageVaccines";
import { useTheme } from "../ThemeContext";

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
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  if (vaccinesLoading || manageLoading) {
    return <div>Loading...</div>;
  }

  if (vaccinesError || manageError) {
    return <div>{vaccinesError || manageError}</div>;
  }

  const handleUpdate = (vaccineId) => {
    const updatedData = {};
    updateVaccine(vaccineId, updatedData);
  };

  const handleDelete = (vaccineId) => {
    deleteVaccine(vaccineId);
  };
  const handleAddVaccine = () => {
    setModalOpen(true);
    console.log("Add");
  };

  return (
    <>
      <h1 className="text-4xl font-bold uppercase text-center p-4">Vaccines</h1>
      <div className="flex gap-3">
        <div className="relative">
          {modalOpen && (
            <div className=" x w-96 p-10 absolute">
              <form className="flex flex-col items-center gap-4">
                <label>Name:</label>
                <input type="text" name="name" />
                <label>Expiry Date:</label>
                <input type="date" name="expiryDate" />
                <button type="submit">Add</button>
              </form>
            </div>
          )}
        </div>
        {vaccines.length === 0 && <p>No vaccines found.</p>}
        <div>
          <button
            className={`mt-4 p-3 rounded-lg hover:opacity-70  ${
              theme === "dark"
                ? "bg-blue-900  text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            type="button"
            onClick={handleAddVaccine}
          >
            Add
          </button>
        </div>
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
