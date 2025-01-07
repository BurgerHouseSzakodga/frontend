import { useEffect, useState } from "react";

import { LineChart } from "@mui/x-charts/LineChart";

import { fetchRevenueByTimePeriod } from "../api/http";

const RevenueChart = () => {
  const [revenueByTimePeriod, setRevenueByTimePeriod] = useState([]);
  const [selectedRange, setSelectedRange] = useState(15);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const data = await fetchRevenueByTimePeriod(selectedRange);
        setRevenueByTimePeriod(data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenue();
  }, [selectedRange]);

  return (
    <div className="revenue-chart">
      <select
        value={selectedRange}
        onChange={(e) => setSelectedRange(e.target.value)}
      >
        <option>30</option>
        <option>15</option>
        <option>7</option>
      </select>
      <LineChart
        series={[
          {
            data: [...revenueByTimePeriod],
          },
        ]}
        width={848}
        height={300}
        sx={{ backgroundColor: "white", borderRadius: "5px" }}
      />
    </div>
  );
};

export default RevenueChart;
