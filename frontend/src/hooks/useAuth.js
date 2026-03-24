// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }

  const { setUser, setIsAuthenticated, setIsAdmin } = context;

  // --- LOGIN ---
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { userResponse, accessToken } = response.data;

      localStorage.setItem("token", accessToken);
      setUser(userResponse);
      setIsAuthenticated(true);
      setIsAdmin(userResponse.role === "admin");
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "Erreur de connexion" };
    }
  };

  // --- LOGOUT ---
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post("/auth/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      console.error(`Erreur serveur lors du logout ${e}`);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // --- REGISTER ---
  const register = async ({username,email,password}) => {
    try {
      const response = await api.post("/auth/register", { username, email, password });
      if (response.data.accessToken) {
        const { userResponse, accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(userResponse));
        setUser(userResponse);
        setIsAuthenticated(true);
        setIsAdmin(userResponse.role === "admin");
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "Erreur d'inscription" };
    }
  };

  return {
    ...context, // user, isAuthenticated, isAdmin, etc.
    login,
    logout,
    register
  };
};