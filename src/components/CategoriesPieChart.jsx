import { useEffect, useState } from "react";

import { PieChart } from "@mui/x-charts";

import { fetchData } from "../api/http";

const CategoriesPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const burgers = await fetchData(`api/number-of-items-in-a-category/${1}`);
      const desserts = await fetchData(
        `api/number-of-items-in-a-category/${2}`
      );
      const drinks = await fetchData(`api/number-of-items-in-a-category/${3}`);
      const sides = await fetchData(`api/number-of-items-in-a-category/${4}`);

      setData([
        {
          id: 0,
          value: burgers,
          label: "Burgerek",
        },
        {
          id: 1,
          value: desserts,
          label: "Desszertek",
        },
        {
          id: 2,
          value: drinks,
          label: "Italok",
        },
        {
          id: 3,
          value: sides,
          label: "Köretek",
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

export default CategoriesPieChart;
