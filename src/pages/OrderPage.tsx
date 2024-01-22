import AllOrder from "../component/pages/Order/AllOrder";
import useDocumentTitle from "./../hooks/useDocumentTitle";

import { Tabs, TabsProps } from "antd";
const OrderPage = () => {
  useDocumentTitle("Đơn hàng");

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "Tất cả",
      children: <AllOrder />,
    },
    {
      key: "pending",
      label: "Chờ duyệt",
      children: "Chờ duyệt",
    },
    {
      key: "waitforpay",
      label: "Chờ thanh toán",
      children: "Chờ thanh toán",
    },
    {
      key: "waitforship",
      label: "Chờ giao hàng",
      children: "Chờ giao hàng",
    },
    {
      key: "success",
      label: "Hoàn thành",
      children: "Hoàn thành",
    },
    {
      key: "cancel",
      label: "Đã huỷ",
      children: "Đã huỷ",
    },
    {
      key: "returnorder",
      label: "Trả hàng",
      children: "Trả hàng",
    },
  ];

  return (
    <div className="order-page">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
export default OrderPage;
