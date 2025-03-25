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
  const [updatePasswordMessage , setupdatePasswordMessage ] = useState([]);
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
        const response = await apiClient.patch("/api/user/update-profile", updatedUserData); // Győződj meg róla, hogy PATCH metódust használ
        console.log("Sikeres adat küldés:", response.data);
        setUser(response.data);
        setUpdateMessage({ success: "Adatok sikeresen módosítva!" });
        return response.data;
    } catch (error) {
        if (error.response?.status === 422) {
            setUpdateMessage(error.response.data.errors); // Hibák mentése
        } else {
            console.error("Hiba történt a profil frissítése közben:", error);
            setUpdateMessage({ error: "Ismeretlen hiba történt." });
        }
        throw error;
    } finally {
        setAuthLoading(false);
    }
}, [setUser]);

  const patchPassword = useCallback(async (updatedPasswordData) => {
    setAuthLoading(true);
    setupdatePasswordMessage([]); // Töröljük az előző hibákat
    try {
        const response = await apiClient.put("/api/user/password", updatedPasswordData);
        console.log("Sikeres adat küldés happy van:)", response.data);
        setupdatePasswordMessage({ success: "Jelszó sikeresen módosítva!" });
        return response.data;
    } catch (error) {
        if (error.response?.status === 422) {
            setupdatePasswordMessage(error.response.data.errors); // Hibák beállítása
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
    setRegisterError([]);
    try {
      await authenticateUser("/register", payload);
      await getUser();
      navigate("/");
    } catch (error) {
      error.response.status === 422 &&
        setRegisterError(error.response.data.errors);
        
    } finally {
      setAuthLoading(false);
      setRegisterError([]);
      

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
    updatePasswordMessage,
    isAdmin,
    setRegisterError,
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
