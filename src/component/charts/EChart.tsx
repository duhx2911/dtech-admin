import { Column } from "@ant-design/plots";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
// import { ApexOptions } from "apexcharts";

function EChart() {
  const { data: dataEChart } = useFetch("statistical");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (dataEChart && dataEChart.length) {
      setData(dataEChart);
    }
  }, [dataEChart]);
  const config: any = {
    data,
    xField: "category",
    yField: "sales",
    seriesField: "category",
    legend: {
      position: "top-left",
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
  };
  return <Column {...config} />;
}

export default EChart;
