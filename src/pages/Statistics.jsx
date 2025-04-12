import CategoriesPieChart from "../components/CategoriesPieChart";
// import ItemsTreeView from "../components/ItemsTreeView";
import OrdersPieChart from "../components/OrdersPieChart";
import RevenueChart from "../components/RevenueChart";

const Statistics = () => {
  return (
    <div className="statistics">
      <RevenueChart />
      <OrdersPieChart />
      <CategoriesPieChart />
      {/* <ItemsTreeView /> */}
    </div>
  );
};

export default Statistics;
