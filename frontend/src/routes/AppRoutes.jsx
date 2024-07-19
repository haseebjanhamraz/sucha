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
import SingleCow from "../pages/SingleCow";
import PushAiSemens from "../pages/PushAISemens";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import Vaccines from "../pages/Vaccines";

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
          path="/cows/:id"
          element={
            <ProtectedRoute>
              <Dashboard>
                <SingleCow />
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
          path="/cows/pushai/"
          element={
            <ProtectedRoute>
              <Dashboard>
                <PushAiSemens />
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

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Dashboard>
                <Settings />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/profile"
          element={
            <ProtectedRoute>
              <Dashboard>
                <Profile />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/vaccines"
          element={
            <ProtectedRoute>
              <Dashboard>
                <Vaccines />
              </Dashboard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
