import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import useFetch from "../../hooks/useFetch";
import { convertPriceToVND, dateFormat, getDate } from "../../constants";

const LineChart = () => {
  const { data: dataLineChart } = useFetch("revenue-detail");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (dataLineChart && dataLineChart.length) {
      setData(dataLineChart);
    }
  }, [dataLineChart]);
  const config = {
    data,
    xField: "order_date",
    yField: "daily_revenue",
    seriesField: "categoryName",
    smooth: true,
    meta: {
      order_date: {
        formatter: (value: any) => `${getDate(value)}`,
      },
      daily_revenue: {
        formatter: (value: any) => `${convertPriceToVND.format(value)}`,
      },
    },
    yAxis: {
      label: {
        formatter: (val: any) =>
          `${val}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };

  return <Line {...config} />;
};
export default LineChart;
