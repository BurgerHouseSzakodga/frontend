import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/contexts";

const AuthLayout = () => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/bejelentkezes" />;
};

export default AuthLayout;
