import { useCallback, useContext, useEffect, useState } from "react";

import { AdminContext, AuthContext } from "./contexts";
import { apiClient } from "../api/axios";

const AdminContextProvider = ({ children }) => {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const { user } = useContext(AuthContext);

  const isAdmin = user?.is_admin;

  const fetchAdminData = useCallback(async () => {
    if (!isAdmin) return;

    try {
      const [usersResponse, ordersResponse, revenueResponse] =
        await Promise.all([
          apiClient.get("api/number-of-users"),
          apiClient.get("api/number-of-orders"),
          apiClient.get("api/total-revenue"),
        ]);

      setNumberOfUsers(usersResponse.data);
      setNumberOfOrders(ordersResponse.data);
      setTotalRevenue(revenueResponse.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  return (
    <AdminContext.Provider
      value={{ numberOfUsers, numberOfOrders, totalRevenue }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
