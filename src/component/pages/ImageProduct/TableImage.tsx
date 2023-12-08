import { Button, Image, Popconfirm, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Categories, ENV_BE } from "../../../constants";
import { useSelector } from "react-redux";
const TableImage = ({ openEdit, deleteCate }: any) => {
  const dataImgProduct: any = useSelector<any>(
    (state) => state.imageProductReducer.images
  );
  const columns: ColumnsType<Categories> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Id sản phẩm",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Ảnh",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (value) => (
        <Image width={80} src={`${ENV_BE}/getPhoto/${value}`} />
      ),
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
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
      dataSource={dataImgProduct}
      rowKey={"id"}
    />
  );
};
export default TableImage;
