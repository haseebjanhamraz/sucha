// src/App.jsx
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
