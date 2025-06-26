import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ setToken, setUserEmail, setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();

    // ✅ Check input before request
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/${isLogin ? "login" : "register"}`;

      const res = await axios.post(
        url,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (isLogin) {
        // ✅ Store login session
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
      console.error("Auth error:", err.response); // ✅ helpful debug log
      alert(err.response?.data?.error || "Something went wrong. Try again.");
    }
  };

  return (
    <form onSubmit={handleAuth} style={styles.form}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={styles.input}
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p style={styles.toggle} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New user? Register" : "Already registered? Login"}
      </p>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '300px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '0.6rem',
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  toggle: {
    marginTop: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#007bff'
  }
};

export default AuthForm;
