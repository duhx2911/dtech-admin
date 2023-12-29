import { Pie } from "@ant-design/plots";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

function PieChart() {
  const { data: dataEChart } = useFetch("revenue");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (dataEChart && dataEChart.length) {
      setData(dataEChart);
    }
  }, [dataEChart]);
  const config = {
    appendPadding: 10,
    data,
    angleField: "total",
    colorField: "category",
    radius: 0.8,
    label: {
      type: "inner",
      content: "{percentage}",
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
}

export default PieChart;
