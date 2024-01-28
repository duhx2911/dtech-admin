import { Avatar, Button, Input, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Products, convertPriceToVND } from "../../../constants";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Search } = Input;
const TableProduct = ({ openEdit, deletePrd }: any) => {
  const dataProduct: any = useSelector<any>(
    (state) => state.productReducer.products
  );
  const [searchText, setSearchText] = useState("");
  const columns: ColumnsType<Products> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
      filteredValue: [searchText],
      onFilter: (value: any, record) => {
        return record.product_name.includes(value);
      },
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",

      render: (value) => <span>{convertPriceToVND.format(value)}</span>,
    },

    {
      title: "Ảnh",
      dataIndex: "artwork",
      key: "artwork",
      render: (url: string) => <Avatar shape="square" size={64} src={url} />,
    },
    {
      title: "Đường dẫn",
      dataIndex: "slug",
      key: "slug",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn chắc chắn muốn xóa sản phẩm này?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => deletePrd(record.id)}
          >
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="table-product">
      <div style={{ width: 300, marginBottom: 10 }}>
        <Search
          placeholder="Nhập tên sản phẩm"
          enterButton
          onSearch={(value: string) => setSearchText(value)}
        />
      </div>
      <Table columns={columns} dataSource={dataProduct} rowKey={"id"} />
    </div>
  );
};
export default TableProduct;
