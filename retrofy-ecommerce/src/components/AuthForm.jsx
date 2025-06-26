import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ setToken, setUserEmail, setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/${isLogin ? "login" : "register"}`;
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
    <div style={styles.container}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isLogin ? "Login" : "Register"}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} style={styles.toggle}>
          {isLogin ? "New user? Register" : "Already registered? Login"}
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    padding: "1.5rem",
    maxWidth: "300px",
    margin: "2rem auto",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    marginBottom: "1rem",
    padding: "0.6rem",
    fontSize: "1rem"
  },
  button: {
    width: "100%",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    padding: "0.6rem",
    cursor: "pointer"
  },
  toggle: {
    marginTop: "1rem",
    color: "#007bff",
    cursor: "pointer",
    textAlign: "center"
  }
};

export default AuthForm;
