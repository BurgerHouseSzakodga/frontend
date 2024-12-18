import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/contexts";

const AdminLayout = () => {
  const { isAdmin } = useContext(AuthContext);

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminLayout;
