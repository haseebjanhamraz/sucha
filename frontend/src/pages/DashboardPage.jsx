// DashboardPage.jsx
import React from "react";
import MilkCard from "../components/cards/MilkCard";
import CowCountCard from "../components/cards/CowCountCard";
import useMilkRecords from "../hooks/useMilkRecords";
import PregnantCowsCard from "../components/cards/PregnantCowsCard";
import useCows from "../hooks/useCows";

const DashboardPage = () => {
  const {
    totalQuantity,
    loading: milkLoading,
    error: milkError,
  } = useMilkRecords();
  const { cows, loading: cowsLoading, error: cowsError } = useCows();

  const female = cows.filter(
    (cows) => cows.sex === "female" && cows.pregnant === true
  );
  const male = cows.filter((cows) => cows.sex === "male");

  if (milkLoading || cowsLoading) return <div>Loading...</div>;
  if (milkError) return <div className="text-red-500">{milkError}</div>;
  if (cowsError) return <div className="text-red-500">{cowsError}</div>;

  return (
    <div className="flex flex-wrap gap-4 p-4 items-stretch ">
      <CowCountCard
        count={cows.length}
        female={female.length}
        male={male.length}
      />
      <MilkCard totalQuantity={totalQuantity} />
      <PregnantCowsCard count={female.length} />
    </div>
  );
};

export default DashboardPage;
