import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ setToken, setUserEmail, setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
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
      alert(err.response?.data?.error || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleAuth}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New user? Register" : "Already registered? Login"}
      </p>
    </form>
  );
};

export default AuthForm;
