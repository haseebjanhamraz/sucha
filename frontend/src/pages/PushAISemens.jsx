import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "../ThemeContext";
import useFemaleCows from "../hooks/useFemaleCows";
import { SnackbarProvider, useSnackbar } from "notistack";
import useAISemens from "../hooks/useAISemens";

const PushAiSemen = () => {
  const { aisemens } = useAISemens();
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useTheme();
  const {
    femaleCows,
    loading: cowsLoading,
    error: cowsError,
  } = useFemaleCows();
  const [record, setRecord] = useState({
    animalId: "",
    date: "",
    semenId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pushAi = async (newRecord) => {
    setLoading(true);
    try {
      console.log(newRecord.animalId);
      const response = await axios.post(
        `http://localhost:8080/api/inject-ai/${newRecord.animalId}`,
        newRecord,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError("Failed to add AI record. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const recordWithDate = { ...record, date: record.date || currentDate };
    try {
      await pushAi(recordWithDate);
      setRecord({ animalId: "", date: "", semenId: "" });
      enqueueSnackbar("AI Semen record added successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to add AI semen. Please try again.", {
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
          value={record.semenId}
          onChange={(e) => setRecord({ ...record, semenId: e.target.value })}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Semen</option>
          {aisemens.map((aisemen) => (
            <option key={aisemen._id} value={aisemen._id}>
              {aisemen.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add Record
        </button>
      </form>
    </div>
  );
};

const PushAISemen = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
    <PushAiSemen />
  </SnackbarProvider>
);

export default PushAISemen;
