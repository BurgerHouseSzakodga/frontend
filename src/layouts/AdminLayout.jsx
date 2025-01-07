import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext, MenuItemContext } from "../context/contexts";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";

const AdminLayout = () => {
  const { isAdmin, authLoading } = useContext(AuthContext);
  const { menuItemError, setMenuItemError } = useContext(MenuItemContext);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? (
    <div className="admin-layout">
      <Modal
        className="modal error-modal"
        open={!!menuItemError}
        onCloseModal={() => setMenuItemError(null)}
      >
        <p>{menuItemError}</p>
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
