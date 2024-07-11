// src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import DashboardPage from "../pages/DashboardPage";
import CowsPage from "../pages/CowsPage";
import MilkingRecordsPage from "../pages/MilkingRecordsPage";
import VaccinationRecordsPage from "../pages/VaccinationRecordsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard>
              <DashboardPage />
            </Dashboard>
          }
        />
        <Route
          path="/cows"
          element={
            <Dashboard>
              <CowsPage />
            </Dashboard>
          }
        />
        <Route
          path="/milking-records"
          element={
            <Dashboard>
              <MilkingRecordsPage />
            </Dashboard>
          }
        />
        <Route
          path="/vaccination-records"
          element={
            <Dashboard>
              <VaccinationRecordsPage />
            </Dashboard>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
