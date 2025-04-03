import { useEffect, useState } from "react";

import { LineChart } from "@mui/x-charts/LineChart";

import Modal from "./Modal";
import Loader from "./Loader";
import errorIcon from "/assets/error.svg";
import { fetchRevenueByTimePeriod } from "../api/http";

const RevenueChart = () => {
  const [revenueByTimePeriod, setRevenueByTimePeriod] = useState([]);
  const [selectedRange, setSelectedRange] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [chartError, setChartError] = useState(null);

  const generateDates = (length) => {
    const today = new Date();
    return Array.from({ length }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (length - 1 - i));
      return date.toISOString().split("T")[0];
    });
  };

  useEffect(() => {
    const fetchRevenue = async () => {
      setIsLoading(true);

      try {
        const data = await fetchRevenueByTimePeriod(selectedRange);
        setRevenueByTimePeriod(data);
      } catch (error) {
        setChartError("Hiba az adatok betöltése során", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevenue();
  }, [selectedRange]);

  if (isLoading) {
    return <Loader />;
  }

  const chartData = generateDates(revenueByTimePeriod.length).map(
    (date, index) => ({
      x: new Date(date),
      y:
        parseFloat(revenueByTimePeriod[index]) == 0
          ? null
          : parseFloat(revenueByTimePeriod[index]),
    })
  );

  return (
    <>
      <div className="revenue-chart">
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(Number(e.target.value))}
        >
          <option value={30}>Az elmúlt hónap</option>
          <option value={15}>Az elmúlt két hét</option>
          <option value={7}>A héten</option>
        </select>
        <LineChart
          series={[
            {
              dataKey: "y",
              connectNulls: true,
            },
          ]}
          xAxis={[
            {
              scaleType: "time",
              dataKey: "x",
              label: "Dátum",
              valueFormatter: (date) =>
                new Date(date).toLocaleDateString("hu-HU", {
                  month: "short",
                  day: "numeric",
                }),
            },
          ]}
          dataset={chartData}
          width={848}
          height={300}
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
        />
      </div>
      <Modal
        className="modal error-modal"
        open={!!chartError}
        onCloseModal={() => setChartError(null)}
      >
        <img src={errorIcon} />
        <p>{chartError}</p>
        <form method="dialog">
          <input type="submit" value="ok" />
        </form>
      </Modal>
    </>
  );
};

export default RevenueChart;
