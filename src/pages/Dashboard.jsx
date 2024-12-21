import { useContext } from "react";

import InfoCard from "../components/InfoCard";
import { AdminContext } from "../context/contexts";

const Dashboard = () => {
  const { numberOfUsers, numberOfOrders, totalRevenue } =
    useContext(AdminContext);

  return (
    <div className="dashboard">
      <InfoCard value={numberOfUsers} />
      <InfoCard value={numberOfOrders} />
      <InfoCard value={totalRevenue} />
    </div>
  );
};

export default Dashboard;
