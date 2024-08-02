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
import AiSemens from "../pages/AiSemens";
import AddMilkRecordPage from "../pages/AddMilkRecordPage";
import InjectVaccine from "../pages/InjectVaccine";

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
          path="/milking-records/add"
          element={
            <ProtectedRoute>
              <Dashboard>
                <AddMilkRecordPage />
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
          path="/cows/inject-vaccines/"
          element={
            <ProtectedRoute>
              <Dashboard>
                <InjectVaccine />
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
        <Route
          path="/settings/ai-semens"
          element={
            <ProtectedRoute>
              <Dashboard>
                <AiSemens />
              </Dashboard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
