import React, { useState } from "react";
import MilkingRecordsPage from "./MilkingRecordsPage";
import MilkCard from "../components/cards/MilkCard";

const DashboardPage = () => {
  const [totalMilk, setQuantity] = useState(0);

  return (
    <div>
      <MilkCard totalMilk={totalMilk} />
    </div>
  );
};

export default DashboardPage;
