import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/contexts";
import Loader from "../components/Loader";

const AuthLayout = () => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <Loader />;
  }

  return user ? <Outlet /> : <Navigate to="/bejelentkezes" />;
};

export default AuthLayout;
