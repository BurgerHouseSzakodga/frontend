import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./contexts";
import { fetchUser, loginUser, registerUser, logoutUser } from "../api/http";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState([]);
  const [registerError, setRegisterError] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    setAuthLoading(true);
    try {
      const data = await fetchUser();
      setUser(data);
    } catch (error) {
      console.error("No authenticated user:", error);
    } finally {
      setAuthLoading(false);
    }
  }, [setUser]);

  const login = async (payload) => {
    setAuthLoading(true);
    setLoginError([]);
    try {
      await loginUser(payload);
      await getUser();
      navigate("/");
    } catch (error) {
      error.response.status === 422 &&
        setLoginError(error.response.data.errors);
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (payload) => {
    setAuthLoading(true);
    setLoginError([]);
    try {
      await registerUser(payload);
      await getUser();
      navigate("/");
    } catch (error) {
      error.response.status === 422 &&
        setRegisterError(error.response.data.errors);
    } finally {
      setAuthLoading(false);
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
    authLoading,
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
