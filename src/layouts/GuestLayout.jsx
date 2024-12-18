import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/contexts";

const GuestLayout = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : <Outlet />;
};
export default GuestLayout;
