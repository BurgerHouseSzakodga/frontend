import { useContext } from "react";

import InfoCard from "../components/InfoCard";
import { OrderContext, UserContext } from "../context/contexts";
import usersIcon from "/assets/users.svg";
import ordersIcon from "/assets/orders.svg";
import revenueIcon from "/assets/revenue.svg";
import pendingOrdersIcon from "/assets/pending-orders.svg";
import UsersTable from "../components/UsersTable";
import MenuItemsTable from "../components/MenuItemsTable";
import RevenueChart from "../components/RevenueChart";

const Dashboard = () => {
  const { numberOfOrders, totalRevenue, pendingOrders, ordersLoading } =
    useContext(OrderContext);

  const { numberOfUsers, userLoading } = useContext(UserContext);

  return (
    <div className="dashboard">
      <div className="info-cards">
        <InfoCard
          title="Felhasználók száma"
          value={numberOfUsers}
          loading={userLoading}
          image={usersIcon}
        />
        <InfoCard
          title="Rendelések száma"
          value={numberOfOrders}
          loading={ordersLoading}
          image={ordersIcon}
        />
        <InfoCard
          title="Teljes bevétel"
          value={totalRevenue + " Ft"}
          loading={ordersLoading}
          image={revenueIcon}
        />
        <InfoCard
          title="Kiszolgálás alatt"
          value={pendingOrders}
          loading={ordersLoading}
          image={pendingOrdersIcon}
        />
      </div>
      <RevenueChart />
      <UsersTable />
      <MenuItemsTable modifiable={false} isEditing={false} />
    </div>
  );
};

export default Dashboard;
