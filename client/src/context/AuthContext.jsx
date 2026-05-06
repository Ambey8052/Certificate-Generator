import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      setError(null);
      const data = await authAPI.getProfile(token);
      if (data.admin) {
        setUser(data.admin);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError(err.message);
      localStorage.removeItem("authToken");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const data = await authAPI.register({ name, email, password });
      if (!data.token) {
        throw new Error(data.message || "Registration failed");
      }
      localStorage.setItem("authToken", data.token);
      setToken(data.token);
      setUser(data.admin);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await authAPI.login({ email, password });
      if (!data.token) {
        throw new Error(data.message || "Login failed");
      }
      localStorage.setItem("authToken", data.token);
      setToken(data.token);
      setUser(data.admin);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
