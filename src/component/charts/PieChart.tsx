import { Pie } from "@ant-design/plots";

function PieChart() {
  const data = [
    {
      type: "iPhone",
      value: 57,
    },
    {
      type: "iPad",
      value: 25,
    },
    {
      type: "Mac",
      value: 18,
    },
    {
      type: "Watch",
      value: 15,
    },
    {
      type: "Âm thanh",
      value: 10,
    },
    {
      type: "Phụ kiện",
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
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
