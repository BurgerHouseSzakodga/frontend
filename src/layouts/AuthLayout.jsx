import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/contexts";

const AuthLayout = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/bejelentkezes" />;
};

export default AuthLayout;
