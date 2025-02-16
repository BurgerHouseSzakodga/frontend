import ItemsTreeView from "../components/ItemsTreeView";
import OrdersPieChart from "../components/OrdersPieChart";
import RevenueChart from "../components/RevenueChart";

const Statistics = () => {
  return (
    <div className="statistics">
      <OrdersPieChart />
      <RevenueChart />
      <ItemsTreeView />
    </div>
  );
};

export default Statistics;
