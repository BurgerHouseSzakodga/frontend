import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { fetchData } from "../api/http";

const OrdersPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const deliveriesResponse = await fetchData("api/number-of-deliveries");
      const collectsResponse = await fetchData("api/number-of-collects");

      setData([
        {
          id: 0,
          value: deliveriesResponse,
          label: "Házhozszállítás",
        },
        {
          id: 1,
          value: collectsResponse,
          label: "Átvétel az éttermeben",
        },
      ]);
    };

    fetchChartData();
  }, []);

  return (
    <PieChart
      series={[
        {
          labelPosition: "outside",
          data: [...data],
        },
      ]}
      width={400}
      height={300}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "bottom", horizontal: "middle" },
        },
      }}
      margin={{ bottom: 60 }}
      sx={{ backgroundColor: "white", borderRadius: "5px" }}
    />
  );
};

export default OrdersPieChart;
