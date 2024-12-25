import { useContext, useEffect, useState } from "react";

import { AdminContext, AuthContext, GuestContext } from "./contexts";
import {
  fetchAdminData,
  updateIsAdmin,
  deleteUser,
  updateMenuItemName,
  updateMenuItemPrice,
  updateMenuItemCategory,
  createMenuItem,
} from "../api/http";

const AdminContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [adminError, setAdminError] = useState(null);

  const { user } = useContext(AuthContext);
  const { setMenuItems } = useContext(GuestContext);

  const isAdmin = user?.is_admin;

  useEffect(() => {
    const getAdminData = async () => {
      if (!isAdmin) return;

      try {
        const data = await fetchAdminData();
        setUsers(data.users);
        setNumberOfUsers(data.numberOfUsers);
        setNumberOfOrders(data.numberOfOrders);
        setTotalRevenue(data.totalRevenue);
        setPendingOrders(data.pendingOrders);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    getAdminData();
  }, [isAdmin]);

  const handleUpdateIsAdmin = async (userId, isAdmin) => {
    try {
      const updatedUser = await updateIsAdmin(userId, isAdmin);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const handleUpdateMenuItemName = async (menuItemId, name) => {
    try {
      const updatedMenuItem = await updateMenuItemName(menuItemId, name);
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.id === menuItemId ? updatedMenuItem : item
        )
      );
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const handleUpdateMenuItemPrice = async (menuItemId, price) => {
    try {
      const updatedMenuItem = await updateMenuItemPrice(menuItemId, price);
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.id === menuItemId ? updatedMenuItem : item
        )
      );
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const handleUpdateMenuItemCategory = async (menuItemId, categoryId) => {
    try {
      const updatedMenuItem = await updateMenuItemCategory(
        menuItemId,
        categoryId
      );
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.id === menuItemId ? updatedMenuItem : item
        )
      );
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const handleCreateMenuItem = async (payload) => {
    try {
      const newMenuItem = await createMenuItem(payload);
      setMenuItems((prevMenuItems) => [...prevMenuItems, newMenuItem]);
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const ctxValue = {
    users,
    numberOfUsers,
    numberOfOrders,
    totalRevenue,
    pendingOrders,
    adminError,
    setAdminError,
    updateIsAdmin: handleUpdateIsAdmin,
    deleteUser: handleDeleteUser,
    updateMenuItemName: handleUpdateMenuItemName,
    updateMenuItemPrice: handleUpdateMenuItemPrice,
    updateMenuItemCategory: handleUpdateMenuItemCategory,
    handleCreateMenuItem,
  };

  return (
    <AdminContext.Provider value={{ ...ctxValue }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
