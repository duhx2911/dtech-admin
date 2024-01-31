import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ProductDetails } from "../../../constants";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Search } = Input;
const TableProductDetail = ({ openEdit, deletePrdDetail }: any) => {
  const dataProductDetail: any = useSelector<any>(
    (state) => state.productReducer.productdetails
  );
  const [searchText, setSearchText] = useState("");
  const columns: ColumnsType<ProductDetails> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Id sản phẩm",
      dataIndex: "product_id",
      key: "product_id",
      filteredValue: [searchText],
      onFilter: (value: any, record) => {
        return record.product_id.toString().includes(value);
      },
    },

    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Tồn kho",
      dataIndex: "quantity",
      key: "quantity",
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
            description="Bạn chắc chắn muốn xóa?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => deletePrdDetail(record.id)}
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
          placeholder="Nhập id sản phẩm"
          enterButton
          onSearch={(value: string) => setSearchText(value)}
        />
      </div>
      <Table columns={columns} dataSource={dataProductDetail} rowKey={"id"} />
    </div>
  );
};
export default TableProductDetail;
