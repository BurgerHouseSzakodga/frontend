import { useCallback, useContext, useEffect, useState } from "react";

import { AdminContext, AuthContext } from "./contexts";
import { apiClient } from "../api/axios";

const AdminContextProvider = ({ children }) => {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const { user } = useContext(AuthContext);

  const isAdmin = user?.is_admin;

  const getNumberOfUsers = useCallback(async () => {
    if (isAdmin) {
      try {
        const { data } = await apiClient.get("api/number-of-users");
        setNumberOfUsers(data);
      } catch (error) {
        console.error("No authenticated user:", error);
      }
    }
  }, [setNumberOfUsers, isAdmin]);

  const getNumberOfOrders = useCallback(async () => {
    if (isAdmin) {
      try {
        const { data } = await apiClient.get("api/number-of-orders");
        setNumberOfOrders(data);
      } catch (error) {
        console.error("No authenticated user:", error);
      }
    }
  }, [setNumberOfOrders, isAdmin]);

  const getTotalRevenue = useCallback(async () => {
    if (isAdmin) {
      try {
        const { data } = await apiClient.get("api/total-revenue");
        setTotalRevenue(data);
      } catch (error) {
        console.error("No authenticated user:", error);
      }
    }
  }, [setTotalRevenue, isAdmin]);

  useEffect(() => {
    if (!numberOfUsers) {
      getNumberOfUsers();
    }
    if (!numberOfOrders) {
      getNumberOfOrders();
    }
    if (!totalRevenue) {
      getTotalRevenue();
    }
  }, [
    numberOfUsers,
    numberOfOrders,
    totalRevenue,
    getNumberOfUsers,
    getNumberOfOrders,
    getTotalRevenue,
  ]);

  return (
    <AdminContext.Provider
      value={{ numberOfUsers, numberOfOrders, totalRevenue }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
