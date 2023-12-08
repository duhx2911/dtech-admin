import { Button, Popconfirm, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Categories } from "../../../constants";
import { useSelector } from "react-redux";
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
      dataIndex: "categoryName",
      key: "categoryName",
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
            Edit
          </Button>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn chắc chắn muốn xóa sản phẩm này?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => deleteCate(record.id)}
          >
            <Button type="primary" danger>
              Delete
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
