import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/contexts";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const { isAdmin } = useContext(AuthContext);

  return isAdmin ? (
    <div className="admin-layout">
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminLayout;
