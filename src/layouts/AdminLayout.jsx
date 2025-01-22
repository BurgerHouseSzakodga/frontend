import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import {
  AuthContext,
  CategoryContext,
  MenuItemContext,
} from "../context/contexts";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import errorIcon from "/assets/error.svg";

const AdminLayout = () => {
  const { isAdmin, authLoading } = useContext(AuthContext);
  const { menuItemError, setMenuItemError } = useContext(MenuItemContext);
  const { categoriesError, setCategoriesError } = useContext(CategoryContext);

  if (authLoading) {
    return <Loader />;
  }

  return isAdmin ? (
    <div className="admin-layout">
      <Sidebar />
      <Outlet />
      <Modal
        className="modal error-modal"
        open={!!menuItemError}
        onCloseModal={() => setMenuItemError(null)}
      >
        <img src={errorIcon} />
        <p>{menuItemError}</p>
        <form method="dialog">
          <input type="submit" value="ok" />
        </form>
      </Modal>
      <Modal
        className="modal error-modal"
        open={!!categoriesError}
        onCloseModal={() => setCategoriesError(null)}
      >
        <img src={errorIcon} />
        <p>{categoriesError}</p>
        <form method="dialog">
          <input type="submit" value="ok" />
        </form>
      </Modal>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminLayout;
