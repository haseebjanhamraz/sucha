// AddMilkRecordPage.jsx
import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import useManageMilkRecords from "../hooks/useManageMilkRecords";
import useFemaleCows from "../hooks/useFemaleCows";
import { SnackbarProvider, useSnackbar } from "notistack";
import useAISemens from "../hooks/useAISemens";

const AddMilkRecordForm = () => {
  const { aisemens } = useAISemens();
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useTheme();
  const { addMilkRecord, loading, error } = useManageMilkRecords();
  const {
    femaleCows,
    loading: cowsLoading,
    error: cowsError,
  } = useFemaleCows();
  const [record, setRecord] = useState({
    animalId: "",
    date: "",
    time: "",
    quantity: 0,
  });

  const handleAddRecord = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const recordWithDate = { ...record, date: record.date || currentDate };
    try {
      await addMilkRecord(recordWithDate);
      setRecord({ animalId: "", date: "", time: "", quantity: 0 });
      enqueueSnackbar("Milk record added successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to add milk record. Please try again.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (loading || cowsLoading) return <div>Loading...</div>;
  if (error || cowsError) return <div>Error loading data.</div>;

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-blue-400"
          : "bg-gray-100 text-gray-800"
      } p-6`}
    >
      <h1 className="text-2xl font-bold mb-6">Push AI Semens</h1>
      <form onSubmit={handleAddRecord} className="flex flex-col gap-4">
        <select
          value={record.animalId}
          onChange={(e) => setRecord({ ...record, animalId: e.target.value })}
          className="p-2 border rounded"
          required
        >
          <option value="">Select a female cow</option>
          {femaleCows.map((cow) => (
            <option key={cow._id} value={cow._id}>
              {cow.tag}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={record.date}
          onChange={(e) => setRecord({ ...record, date: e.target.value })}
          className="p-2 border rounded"
        />

        <select
          value={record.time}
          onChange={(e) => setRecord({ ...record, time: e.target.value })}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Semen</option>
          {aisemens.map((aisemen) => (
            <option value={`{aisemen.name}`}>{aisemen.name} </option>
          ))}
        </select>

        <input
          type="number"
          value={record.quantity}
          onChange={(e) =>
            setRecord({ ...record, quantity: Number(e.target.value) })
          }
          className="p-2 border rounded"
          placeholder="Quantity"
          required
        />

        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add Record
        </button>
      </form>
    </div>
  );
};

const AddMilkRecordPage = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
    <AddMilkRecordForm />
  </SnackbarProvider>
);

export default AddMilkRecordPage;
