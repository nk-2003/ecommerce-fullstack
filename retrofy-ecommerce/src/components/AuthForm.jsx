// src/AuthForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AuthForm = ({ setToken, setUserEmail, setShowLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister ? `${API}/register` : `${API}/login`;
      const payload = isRegister ? { name, email, password } : { email, password };

      const res = await axios.post(url, payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("name", res.data.name);
      setToken(res.data.token);
      setUserEmail(res.data.email);
      setShowLogin(false);
    } catch (err) {
      alert(isRegister ? "Registration failed" : "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          {isRegister ? "Create Account" : "Login to Retrofy"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p
          className="mt-4 text-sm text-center text-blue-600 hover:underline cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "New user? Register"}
        </p>

        <p
          className="mt-2 text-xs text-center text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={() => setShowLogin(false)}
        >
          ❌ Close
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
