import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const AuthForm = ({ setToken, setUserEmail, setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const modalRef = useRef();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/${isLogin ? "login" : "register"}`;
      const res = await axios.post(url, { email, password });

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
        setToken(res.data.token);
        setUserEmail(res.data.email);
        setShowLogin(false);
      } else {
        alert("Registered! Now login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err.response);
      alert(err.response?.data?.error || "Something went wrong.");
    }
  };

  // Escape key to close
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setShowLogin(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  // Click outside to close
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowLogin(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        ref={modalRef}
        onSubmit={handleAuth}
        className="relative bg-white shadow-xl rounded-lg p-6 w-full max-w-sm space-y-4"
      >
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition shadow"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p
          className="text-center text-blue-600 hover:underline cursor-pointer mt-1 text-sm"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'New user? Register' : 'Already registered? Login'}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
