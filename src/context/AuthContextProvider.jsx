import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts";
import { fetchData, authenticateUser, logoutUser } from "../api/http";
import { apiClient } from "../api/axios";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState([]);
  const [registerError, setRegisterError] = useState([]);
  const [updateMessage, setUpdateMessage] = useState([]);
  const [updatePasswordError, setUpdatePasswordError] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    setAuthLoading(true);
    try {
      const data = await fetchData("api/user");
      setUser(data);
    } catch (error) {
      console.error("No authenticated user:", error);
    } finally {
      setAuthLoading(false);
    }
  }, [setUser]);


  const patchUser = useCallback(async (updatedUserData) => {
    setAuthLoading(true);
    setUpdateMessage([]);
    try {
      const response = await apiClient.patch("/api/user/update-profile", updatedUserData);
      console.log("Sikeres adat küldés happy van:)", response.data);
      setUser(response.data); 
      setUpdateMessage({ success: "Adatok sikeresen modositva!" });
      return response.data;
    } catch (error) {
      error.response.status === 422 &&
      setUpdateMessage(error.response.data.errors);
    } finally {
      setAuthLoading(false);
    }
  }, [setUser]);

  const patchPassword = useCallback(async (updatedPasswordData) => {
    setAuthLoading(true);
    setUpdatePasswordError([]); // Töröljük az előző hibákat
    try {
        const response = await apiClient.patch("/api/user/password", updatedPasswordData);
        console.log("Sikeres adat küldés happy van:)", response.data);
        
        return response.data;
    } catch (error) {
        if (error.response?.status === 422) {
            setUpdatePasswordError(error.response.data.errors); // Hibák beállítása
        } else {
            console.error("Hiba a jelszó frissítésekor:", error);
        }
    } finally {
        setAuthLoading(false);
    }
}, [setUser]);


  const login = async (payload) => {
    setAuthLoading(true);
    setLoginError([]);
    try {
      await authenticateUser("/login", payload);
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
      await authenticateUser("/register", payload);
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

  const isAdmin = user?.is_admin === 1;

  const contextValue = {
    user,
    setUser, 
    patchUser, 
    loginError,
    registerError,
    patchPassword,
    updateMessage,
    setUpdateMessage,
    updatePasswordError,
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
