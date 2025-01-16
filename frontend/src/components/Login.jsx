import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Login.module.css"; // Import CSS Module for styling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address.";
    if (password.length < 6) return "Password must be at least 6 characters long.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const message = error.message || "Login failed. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageSection}>
        <img src="/loginbg.png" alt="Login" className={styles.image} />
      </div>
      <div className={styles.formSection}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
