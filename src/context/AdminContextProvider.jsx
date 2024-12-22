import { useCallback, useContext, useEffect, useState } from "react";

import { AdminContext, AuthContext } from "./contexts";
import { fetchAdminData, updateIsAdmin, deleteUser } from "../api/http";

const AdminContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  const { user } = useContext(AuthContext);

  const isAdmin = user?.is_admin;

  const fetchAdminDataCallback = useCallback(async () => {
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
  }, [isAdmin]);

  const handleUpdateIsAdmin = async (userId, isAdmin) => {
    try {
      const updatedUser = await updateIsAdmin(userId, isAdmin);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchAdminDataCallback();
  }, [fetchAdminDataCallback]);

  const ctxValue = {
    users,
    numberOfUsers,
    numberOfOrders,
    totalRevenue,
    pendingOrders,
    updateIsAdmin: handleUpdateIsAdmin,
    deleteUser: handleDeleteUser,
  };

  return (
    <AdminContext.Provider value={{ ...ctxValue }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
