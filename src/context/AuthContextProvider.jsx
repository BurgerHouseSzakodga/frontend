import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./contexts";
import { fetchUser, loginUser, registerUser, logoutUser } from "../api/http";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    try {
      const data = await fetchUser();
      setUser(data);
    } catch (error) {
      console.error("No authenticated user:", error);
    }
  }, [setUser]);

  const login = async (payload) => {
    setError([]);
    try {
      await loginUser(payload);
      await getUser();
      navigate("/");
    } catch (error) {
      error.response.status === 422 && setError(error.response.data.errors);
    }
  };

  const register = async (payload) => {
    setError([]);
    try {
      await registerUser(payload);
      await getUser();
      navigate("/");
    } catch (error) {
      error.response.status === 422 && setError(error.response.data.errors);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  const isAdmin = user?.is_admin === 1 ? true : false;

  const contextValue = {
    user,
    error,
    isAdmin,
    login,
    logout,
    register,
    navigate,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
