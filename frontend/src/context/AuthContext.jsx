import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});// rempli si un composant essaie d'accéder au contexte alors qu'il n'est pas enveloppé dans un AuthProvider

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser)); 
      setIsAdmin(JSON.parse(savedUser).role === "admin");
    }
    setLoading(false); 
  }, []);

  const login = (userData, token) => {
    console.log("Login dans AuthContext avec :", userData, token);

    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(userData.role === "admin");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 4. Fonction de déconnexion
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
  };

  const authCtxValue = {
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
    user,
    setUser,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authCtxValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

