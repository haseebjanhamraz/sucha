// DashboardPage.jsx
import React from "react";
import MilkCard from "../components/cards/MilkCard";
import useMilkRecords from "../hooks/useMilkRecords";

const DashboardPage = () => {
  const { totalQuantity, loading, error } = useMilkRecords();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <MilkCard totalQuantity={totalQuantity} />
    </div>
  );
};

export default DashboardPage;
