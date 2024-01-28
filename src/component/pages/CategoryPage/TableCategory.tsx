import { Button, Popconfirm, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Categories } from "../../../constants";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const TableCategory = ({ openEdit, deleteCate }: any) => {
  const dataCategories: any = useSelector<any>(
    (state) => state.categoryReducer.categories
  );
  const columns: ColumnsType<Categories> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Tên danh mục",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Đường dẫn",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Action",
      key: "action",
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
            onConfirm={() => deleteCate(record.id)}
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
    <Table
      style={{ marginTop: 20 }}
      columns={columns}
      dataSource={dataCategories}
      rowKey={"id"}
    />
  );
};
export default TableCategory;
