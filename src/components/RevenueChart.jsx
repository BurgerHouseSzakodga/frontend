import { useEffect, useState } from "react";

import { LineChart } from "@mui/x-charts/LineChart";

import Modal from "./Modal";
import { fetchRevenueByTimePeriod } from "../api/http";
import errorIcon from "/assets/error.svg";

const RevenueChart = () => {
  const [revenueByTimePeriod, setRevenueByTimePeriod] = useState([]);
  const [selectedRange, setSelectedRange] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [chartError, setChartError] = useState(null);

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
    return <div className="loader"></div>;
  }

  return (
    <>
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
