// src/App.jsx
import { React, useEffect } from "react";
import { ThemeProvider } from "./ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { checkTokenExpiry } from "./utils/tokenUtils";

function App() {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      checkTokenExpiry(token).then((isValid) => {
        if (!isValid) {
          // Handle the case where the token is invalid or expired
          console.log("Token is expired or invalid");
        }
      });
    }
  }, []);

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
