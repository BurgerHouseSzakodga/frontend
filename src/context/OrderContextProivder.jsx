import { useContext, useEffect, useState } from "react";
import { fetchData, updateOrderStatus } from "../api/http";
import { AuthContext, OrderContext, UserContext } from "./contexts";

const OrderContextProivder = ({ children }) => {
  const { isAdmin } = useContext(UserContext);
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [orderError, setOrderError] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const getOrdersData = async () => {
      if (!isAdmin) return;

      setOrdersLoading(true);

      try {
        const ordersResponse = await fetchData("api/orders");
        const totalOrders = await fetchData("api/number-of-orders");
        const revenue = await fetchData("api/total-revenue");
        const pending = await fetchData("api/pending-orders");
        const userOredersResponse=await fetchData(`api/user/order/${user.id}`);

        setOrders(ordersResponse);
        setNumberOfOrders(totalOrders);
        setTotalRevenue(revenue);
        setPendingOrders(pending);
        setUserOrders(userOredersResponse);
      } catch (error) {
        setOrderError(
          error.response.data.message ||
            "Hiba történt az adatok betöltése során."
        );
      } finally {
        setOrdersLoading(false);
      }
    };

    getOrdersData();
  }, [isAdmin]);

  const handleUpdateStatus = async (orderId, status) => {
    if (!isAdmin) return;

    setOrdersLoading(true);
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );
    } catch (error) {
      setOrderError(
        error.response.data.message || "Hiba történt a frissítés során."
      );
    } finally {
      setOrdersLoading(false);
    }
  };

  const ctxValue = {
    orders,
    numberOfOrders,
    totalRevenue,
    pendingOrders,
    orderError,
    ordersLoading,
    handleUpdateStatus,
    userOrders,
  };

  return (
    <OrderContext.Provider value={ctxValue}>{children}</OrderContext.Provider>
  );
};

export default OrderContextProivder;
