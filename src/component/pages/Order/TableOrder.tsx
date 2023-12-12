import { Button, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Categories, convertPriceToVND } from "../../../constants";
import { useSelector } from "react-redux";
const TableOrder = ({ openEdit }: any) => {
  const dataOrder: any = useSelector<any>((state) => state.order.orders);
  const columns: ColumnsType<Categories> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (value) => <span>{convertPriceToVND.format(value)}</span>,
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "totalPay",
      key: "totalPay",
      render: (value) => <span>{convertPriceToVND.format(value)}</span>,
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEdit(record)}>
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      style={{ marginTop: 20 }}
      columns={columns}
      dataSource={dataOrder}
      rowKey={"id"}
    />
  );
};
export default TableOrder;
