import { useState } from "react";
import useVaccines from "../hooks/useVaccines";
import useManageVaccines from "../hooks/useManageVaccines";
import { useTheme } from "../ThemeContext";
import BounceLoader from "react-spinners/BounceLoader";
import ModalTemplate from "../components/modal/ModalTemplate";
import { formatDate } from "../utils/formatDate";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const Vaccines = () => {
  const {
    vaccines,
    loading: vaccinesLoading,
    error: vaccinesError,
  } = useVaccines();

  const {
    addVaccine,
    updateVaccine,
    deleteVaccine,
    loading: manageLoading,
    error: manageError,
  } = useManageVaccines();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [vaccineIdToDelete, setVaccineIdToDelete] = useState(null);

  if (vaccinesLoading) {
    return (
      <div>
        <BounceLoader />
      </div>
    );
  }

  if (vaccinesError || manageError) {
    return <div>{vaccinesError || manageError}</div>;
  }

  const handleUpdate = async (vaccineId) => {
    const updatedData = {
      // Add your form data logic here
    };
    try {
      await updateVaccine(vaccineId, updatedData);
      enqueueSnackbar("Vaccine updated successfully!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar("Failed to update vaccine. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleDelete = (vaccineId) => {
    setVaccineIdToDelete(vaccineId);
    setModalText("Are you sure you want to delete this vaccine?");
    setModalIsOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteVaccine(vaccineIdToDelete)
      .then(() => {
        enqueueSnackbar("Vaccine deleted successfully!", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar("Failed to delete vaccine. Please try again.", {
          variant: "error",
        });
      })
      .finally(() => {
        setModalIsOpen(false);
        setVaccineIdToDelete(null);
      });
  };

  return (
    <SnackbarProvider>
      <ModalTemplate
        modalIsOpen={modalIsOpen}
        modalText={modalText}
        onConfirm={handleConfirmDelete}
        onClose={() => setModalIsOpen(false)}
      />
      <h1 className="text-4xl font-bold uppercase text-center p-4 m-10">
        Vaccines
      </h1>
      <div className="grid grid-cols-3 gap-3 overflow-x-hidden">
        {vaccines.length === 0 && <p>No vaccines found.</p>}
        {vaccines.map((vaccine) => (
          <ul key={vaccine._id} className="w-fit rounded-lg border p-4 mb-4">
            <li className="text-center uppercase text-2xl font-bold">
              {vaccine.name}
            </li>
            <hr className="divide-y border-dashed m-2 divide-blue-200" />
            <li>
              Expiry: <span>{formatDate(vaccine.expiryDate)}</span>
            </li>
            <li>
              Barcode: <span>{vaccine.barcode}</span>
            </li>
            <div className="flex justify-center">
              <button
                onClick={() => handleUpdate(vaccine._id)}
                className="bg-green-500 text-white p-2 rounded-lg mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(vaccine._id)}
                className="bg-red-500 text-white p-2 ml-4 rounded-lg mt-2"
              >
                Delete
              </button>
            </div>
          </ul>
        ))}
      </div>
    </SnackbarProvider>
  );
};

export default Vaccines;
