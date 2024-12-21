import { useCallback, useContext, useEffect, useState } from "react";

import { AdminContext, AuthContext } from "./contexts";
import { apiClient } from "../api/axios";

const AdminContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  const { user } = useContext(AuthContext);

  const isAdmin = user?.is_admin;

  const fetchAdminData = useCallback(async () => {
    if (!isAdmin) return;

    try {
      const [
        usersResponse,
        userNumberResponse,
        ordersResponse,
        revenueResponse,
        pendingOrdersResponse,
      ] = await Promise.all([
        apiClient.get("api/users"),
        apiClient.get("api/number-of-users"),
        apiClient.get("api/number-of-orders"),
        apiClient.get("api/total-revenue"),
        apiClient.get("api/pending-orders"),
      ]);

      setUsers(usersResponse.data);
      setNumberOfUsers(userNumberResponse.data);
      setNumberOfOrders(ordersResponse.data);
      setTotalRevenue(revenueResponse.data);
      setPendingOrders(pendingOrdersResponse.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  }, [isAdmin]);

  const updateIsAdmin = async (userId, isAdmin) => {
    try {
      const response = await apiClient.put(`api/users/${userId}`, {
        is_admin: isAdmin,
      });
      const updatedUser = response.data.user;
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const ctxValue = {
    users,
    numberOfUsers,
    numberOfOrders,
    totalRevenue,
    pendingOrders,
    updateIsAdmin,
  };

  return (
    <AdminContext.Provider value={{ ...ctxValue }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
