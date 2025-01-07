import { useEffect, useState } from "react";
import { fetchAdminData } from "../api/http";

const OrderContextProivder = () => {
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

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

  return <div>DataContextProivder</div>;
};

export default OrderContextProivder;
