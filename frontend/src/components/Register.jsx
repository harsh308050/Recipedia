import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Login.module.css"; // Import CSS Module for styling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!username.trim()) return "Username is required.";
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
      await register(username, email, password);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      const message = error.message || "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.imageSection}>
        <img
          src="public/registerbg.png"
          alt="Register"
          className={styles.image}
        />
      </div>
      <div className={styles.formSection}>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
