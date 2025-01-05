import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AdminContext, AuthContext } from "../context/contexts";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";

const AdminLayout = () => {
  const { isAdmin, loading } = useContext(AuthContext);
  const { adminError, setAdminError } = useContext(AdminContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? (
    <div className="admin-layout">
      <Modal
        className="modal error-modal"
        open={!!adminError}
        onCloseModal={() => setAdminError(null)}
      >
        <p>{adminError}</p>
        <form method="dialog">
          <input type="submit" value="ok" />
        </form>
      </Modal>
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminLayout;
