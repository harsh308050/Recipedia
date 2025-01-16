import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get("/users/profile");
      setUser(response.data);
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error.response?.data || "Login failed";
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await api.post("/users/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      throw error.response?.data || "Registration failed";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
