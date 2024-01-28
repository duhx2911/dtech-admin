import { Button, Space, Input } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { convertPriceToVND } from "../../../constants";
import { useSelector } from "react-redux";
import { useState } from "react";
const { Search } = Input;
const TableOrder = ({ openEdit }: any) => {
  const dataOrder: any = useSelector<any>((state) => state.order.orders);
  const [searchText, setSearchText] = useState("");
  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "order_code",
      key: "order_code",
      filteredValue: [searchText],
      onFilter: (value: any, record: any) => {
        return record.order_code.includes(value);
      },
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
      dataIndex: "total_pay",
      key: "total_pay",
      render: (value) => <span>{convertPriceToVND.format(value)}</span>,
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "payment_method",
      key: "payment_method",
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
    <>
      <div style={{ width: 300 }}>
        <Search
          placeholder="Nhập mã đơn hàng"
          enterButton
          onSearch={(value: string) => setSearchText(value)}
        />
      </div>
      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={dataOrder}
        rowKey={"id"}
      />
    </>
  );
};
export default TableOrder;
