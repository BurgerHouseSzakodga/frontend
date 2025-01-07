import { useContext, useEffect, useState } from "react";

import { AuthContext, UserContext } from "./contexts";
import { fetchAdminData, updateIsAdmin, deleteUser } from "../api/http";

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [adminError, setAdminError] = useState(null);

  const { user } = useContext(AuthContext);

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
        setIngredients(data.ingredients);
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

  const ctxValue = {
    users,
    numberOfUsers,
    numberOfOrders,
    totalRevenue,
    pendingOrders,
    ingredients,
    adminError,
    setAdminError,
    updateIsAdmin: handleUpdateIsAdmin,
    deleteUser: handleDeleteUser,
  };

  return (
    <UserContext.Provider value={{ ...ctxValue }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
