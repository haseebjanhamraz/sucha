import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { token, user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/validate-token`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { user } = response.data;
        setUserData(user);
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mt-10">Profile</h1>
      <div className="mt-5 profile-details">
        <p>
          <strong>Username:</strong> {userData.username}
        </p>
        <p>
          <strong>ID:</strong> {userData._id}
        </p>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
};

export default Profile;
