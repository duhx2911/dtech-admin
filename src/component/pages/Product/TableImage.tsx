import { Button, Image, Popconfirm, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Categories, ENV_BE } from "../../../constants";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import store from "../../../store";
import { deleteImageProduct } from "../../../store/actions/imgProductAction";
const TableImage = ({ deleteImg }: any) => {
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
      title: "Id chi tiết sản phẩm",
      dataIndex: "productdetail_id",
      key: "productdetail_id",
      width: 280,
    },
    {
      title: "Ảnh",
      dataIndex: "img_url",
      key: "img_url",
      render: (value) => (
        <Image width={80} src={`${ENV_BE}/getPhoto/${value}`} />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa "
            description="Bạn chắc chắn muốn xóa này?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => store.dispatch(deleteImageProduct(record))}
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
      dataSource={dataImgProduct}
      rowKey={"id"}
    />
  );
};
export default TableImage;
