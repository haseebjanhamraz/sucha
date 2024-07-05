import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-bold mb-2">Metric 1</h3>
          <p className="text-gray-700">Value</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-bold mb-2">Metric 2</h3>
          <p className="text-gray-700">Value</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-bold mb-2">Metric 3</h3>
          <p className="text-gray-700">Value</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
