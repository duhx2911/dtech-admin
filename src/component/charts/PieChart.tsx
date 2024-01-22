import { Pie } from "@ant-design/plots";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { convertPriceToVND } from "../../constants";
import { Empty } from "antd";

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
    meta: {
      total: {
        formatter: (v: any) => `${convertPriceToVND.format(v)}`,
      },
    },
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
  return data && data.length ? (
    <Pie {...config} />
  ) : (
    <Empty description={"Không có dữ liệu"} />
  );
}

export default PieChart;
