import { useContext, useEffect, useState } from "react";
import { fetchData } from "../api/http";
import { OrderContext, UserContext } from "./contexts";

const OrderContextProivder = ({ children }) => {
  const { isAdmin } = useContext(UserContext);

  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [orderError, setOrderError] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    const getOrdersData = async () => {
      if (!isAdmin) return;

      setOrdersLoading(true);

      try {
        const orders = await fetchData("api/number-of-orders");
        const revenue = await fetchData("api/total-revenue");
        const pending = await fetchData("api/pending-orders");

        setNumberOfOrders(orders);
        setTotalRevenue(revenue);
        setPendingOrders(pending);
      } catch (error) {
        setOrderError(
          error.message.data.message ||
            "Hiba történt az adatok betöltése során."
        );
      } finally {
        setOrdersLoading(false);
      }
    };

    getOrdersData();
  }, [isAdmin]);

  const ctxValue = {
    numberOfOrders,
    totalRevenue,
    pendingOrders,
    orderError,
    ordersLoading,
  };

  return (
    <OrderContext.Provider value={ctxValue}>{children}</OrderContext.Provider>
  );
};

export default OrderContextProivder;
