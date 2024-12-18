import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./contexts";
import { apiClient } from "../api/axios";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const csrf = () => apiClient.get("/sanctum/csrf-cookie");

  const getUser = useCallback(async () => {
    try {
      const { data } = await apiClient.get("api/user");
      setUser(data);
    } catch (error) {
      console.error("No authenticated user:", error);
    }
  }, [setUser]);

  const login = async (payload) => {
    setError([]);
    await csrf();
    try {
      await apiClient.post("/login", payload);
      await getUser();
      navigate("/");
    } catch (error) {
      error.response.status === 422 && setError(error.response.data.errors);
    }
  };

  const register = async (payload) => {
    setError([]);
    await csrf();
    try {
      await apiClient.post("/register", payload);
      await getUser();
      navigate("/");
    } catch (error) {
      error.response.status === 422 && setError(error.response.data.errors);
    }
  };

  const logout = async () => {
    await apiClient.post("/logout");
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  const isAdmin = user?.is_admin === 1 ? true : false;

  const contextValue = {
    user,
    error,
    isAdmin,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
