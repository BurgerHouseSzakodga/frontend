import { useContext, useEffect, useState } from "react";
import { AuthContext, UserContext } from "./contexts";
import { updateIsAdmin, deleteUser, fetchData } from "../api/http";

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [userError, setUserError] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);

  const { user } = useContext(AuthContext);

  const isAdmin = user?.is_admin;

  useEffect(() => {
    const getAdminData = async () => {
      if (!isAdmin) return;

      setUserLoading(true);

      try {
        const usersData = await fetchData("api/users");
        const numberOfUsersData = await fetchData("api/number-of-users");
        const activeUserOrder = await fetchData("api/active-orders");

        setUsers(usersData);
        setNumberOfUsers(numberOfUsersData);
        setHasActiveOrder(!!activeUserOrder.length);
      } catch (error) {
        setUserError(
          error.message.data.message ||
            "Hiba történt az adatok betöltése során."
        );
      } finally {
        setUserLoading(false);
      }
    };
    getAdminData();
  }, [isAdmin]);

  const handleUpdateIsAdmin = async (userId, isAdmin) => {
    setUserLoading(true);

    try {
      const updatedUser = await updateIsAdmin(userId, isAdmin);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (error) {
      setUserError(
        error.message.data.message ||
          "Hiba történt a frissítés betöltése során."
      );
    } finally {
      setUserLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    setUserLoading(true);

    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      setUserError(
        error.message.data.message || "Hiba történt a törlés során."
      );
    } finally {
      setUserLoading(false);
    }
  };

  const ctxValue = {
    users,
    numberOfUsers,
    userError,
    userLoading,
    isAdmin,
    hasActiveOrder,
    setHasActiveOrder,
    setUserError,
    updateIsAdmin: handleUpdateIsAdmin,
    deleteUser: handleDeleteUser,
  };

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
