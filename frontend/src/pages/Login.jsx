// src/components/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex flex-col p-20 items-center justify-center  bg-blue-200">
      <img src="/logo.png" width={"200px"} />
      <h1 className="text-3xl font-bold p-8 uppercase text-blue-800">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          className="bg-inherit border-2 border-blue-500 p-2 m-3 rounded-lg text-blue-800"
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
        <button
          className="text-2xl bg-blue-800 rounded-full p-2 text-white hover:bg-blue-500 mt-4"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
