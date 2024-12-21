import { useCallback, useEffect, useState } from "react";

import { AdminContext } from "./contexts";
import { apiClient } from "../api/axios";

const AdminContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const { data } = await apiClient.get("api/menu-items-admin");
      setMenuItems(data);
    } catch (error) {
      console.error("No authenticated user:", error);
    }
  }, [setMenuItems]);

  useEffect(() => {
    if (!menuItems) {
      getUser();
    }
  }, [menuItems, getUser]);

  console.log(menuItems);

  return (
    <AdminContext.Provider value={{ menuItems }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
