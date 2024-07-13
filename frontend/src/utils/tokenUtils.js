// src/utils/tokenUtils.js
import axios from "axios";

// Function to check token expiry
export const checkTokenExpiry = async (token) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/validate-token",
      { token }
    );
    const { exp } = response.data;

    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token is expired
    if (exp < currentTime) {
      // Remove token from session storage if expired
      sessionStorage.removeItem("token");
      return false; // Token is expired
    }

    return true; // Token is valid
  } catch (error) {
    console.error("Error validating token:", error);
    sessionStorage.removeItem("token"); // Remove token if there's an error validating
    return false;
  }
};
