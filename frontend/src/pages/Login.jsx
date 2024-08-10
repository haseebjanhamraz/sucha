// src/components/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        }
      );
      login(response.data.user, response.data.token);
      navigate("/");
    } catch (error) {
      if (!username) {
        setError("Username is required");
      }
      setError(true);
      console.error("Login failed", error);
    }
  };

  return (
    <section className="flex flex-col p-20 items-center justify-center m-5 rounded-lg shadow-xl shadow-slate-400 bg-blue-200 border-2 border-dashed border-b-blue-600">
      <h1 className="text-3xl font-bold p-8 uppercase text-blue-800">Login</h1>
      <img src="/logo.png" width={"200px"} />
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          className="bg-inherit border-2 font-medium border-blue-500 p-2 m-3 rounded-lg text-blue-800"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="bg-inherit border-2 border-blue-500 p-2 m-3 rounded-lg text-blue-800"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && (
          <div className="flex items-center w-64 px-2 rounded-lg bg-red-600">
            <IoIosWarning className="text-white text-4xl" />
            <h1 className="text-sm font-normal p-2 text-white">
              Ooops!!! Your provided username or password is incorrect.
            </h1>
          </div>
        )}
        <button
          className="text-2xl bg-blue-800 rounded-full p-2 text-white hover:bg-blue-500 mt-4"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
