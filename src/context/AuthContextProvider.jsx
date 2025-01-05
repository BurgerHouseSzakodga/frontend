import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./contexts";
import { fetchUser, loginUser, registerUser, logoutUser } from "../api/http";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState([]);
  const [registerError, setRegisterError] = useState([]);

  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUser();
      setUser(data);
    } catch (error) {
      console.error("No authenticated user:", error);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const login = async (payload) => {
    setLoginError([]);
    try {
      await loginUser(payload);
      await getUser();
      navigate("/");
    } catch (error) {
      error.response.status === 422 &&
        setLoginError(error.response.data.errors);
    }
  };

  const register = async (payload) => {
    setLoginError([]);
    try {
      await registerUser(payload);
      await getUser();
      navigate("/");
    } catch (error) {
      error.response.status === 422 &&
        setRegisterError(error.response.data.errors);
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
    loginError,
    registerError,
    isAdmin,
    loading,
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
