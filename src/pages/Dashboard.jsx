import { useContext } from "react";

import InfoCard from "../components/InfoCard";
import { AdminContext } from "../context/contexts";
import usersIcon from "/assets/users.svg";
import ordersIcon from "/assets/orders.svg";
import revenueIcon from "/assets/revenue.svg";
import pendingOrdersIcon from "/assets/pending-orders.svg";
import UsersTable from "../components/UsersTable";
import MenuItemsTable from "../components/MenuItemsTable";

const Dashboard = () => {
  const { numberOfUsers, numberOfOrders, totalRevenue, pendingOrders } =
    useContext(AdminContext);

  return (
    <div className="dashboard">
      <div className="info-cards">
        <InfoCard
          title="Felhasználók száma"
          value={numberOfUsers}
          image={usersIcon}
        />
        <InfoCard
          title="Rendelések száma"
          value={numberOfOrders}
          image={ordersIcon}
        />
        <InfoCard
          title="Teljes bevétel"
          value={totalRevenue}
          image={revenueIcon}
        />
        <InfoCard
          title="Kiszolgálás alatt"
          value={pendingOrders}
          image={pendingOrdersIcon}
        />
      </div>
      <UsersTable />
      <MenuItemsTable modifiable={false} />
    </div>
  );
};

export default Dashboard;
