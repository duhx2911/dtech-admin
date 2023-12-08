import { Column } from "@ant-design/plots";
// import { ApexOptions } from "apexcharts";

function EChart() {
  const data = [
    {
      type: "iPhone",
      sales: 38,
    },
    {
      type: "iPad",
      sales: 52,
    },
    {
      type: "Mac",
      sales: 61,
    },
    {
      type: "Watch",
      sales: 145,
    },
    {
      type: "Âm thanh",
      sales: 48,
    },
    {
      type: "Phụ kiện",
      sales: 38,
    },
  ];
  const config: any = {
    data,
    xField: "type",
    yField: "sales",
    seriesField: "type",
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
