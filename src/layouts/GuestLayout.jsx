import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/contexts";

const GuestLayout = () => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Navigate to="/" /> : <Outlet />;
};
export default GuestLayout;
