// src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import DashboardPage from "../pages/DashboardPage";
import CowsPage from "../pages/CowsPage";
import MilkingRecordsPage from "../pages/MilkingRecordsPage";
import VaccinationRecordsPage from "../pages/VaccinationRecordsPage";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import AddEditCowPage from "../pages/AddEditCowPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard>
                <DashboardPage />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cows"
          element={
            <ProtectedRoute>
              <Dashboard>
                <CowsPage />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cows/add"
          element={
            <ProtectedRoute>
              <Dashboard>
                <AddEditCowPage />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cows/edit/:id"
          element={
            <ProtectedRoute>
              <Dashboard>
                <AddEditCowPage />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/milking-records"
          element={
            <ProtectedRoute>
              <Dashboard>
                <MilkingRecordsPage />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vaccination-records"
          element={
            <ProtectedRoute>
              <Dashboard>
                <VaccinationRecordsPage />
              </Dashboard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
