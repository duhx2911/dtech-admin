import { Avatar, Button, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Products } from "../../../constants";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const TableProduct = ({ openEdit, deletePrd }: any) => {
  // const dataRedux: any = useSelector((state) => state);
  // const dataProduct = dataRedux?.productReducer?.products || [];
  const dataProduct: any = useSelector<any>(
    (state) => state.productReducer.products
  );
  const dataCategories: any = useSelector<any>(
    (state) => state.categoryReducer.categories
  );
  const columns: ColumnsType<Products> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    // {
    //   title: "Mã sản phẩm",
    //   dataIndex: "product_code",
    //   key: "product_code",
    //   width: 130,
    //   render: (text) => <span>{text}</span>,
    // },
    // {
    //   title: "Danh mục",
    //   dataIndex: "category_id",
    //   key: "category_id",
    //   width: 100,
    //   render: (id) => (
    //     <span>
    //       {dataCategories.map((item: any) => {
    //         return id === item.id ? item.categoryName : null;
    //       })}
    //     </span>
    //   ),
    // },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    // {
    //   title: "Dung lượng",
    //   dataIndex: "capacity",
    //   key: "capacity",
    //   width: 120,
    //   render: (value: number) => (
    //     <span>
    //       {value} {value ? "GB" : null}
    //     </span>
    //   ),
    // },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",

      render: (value) => (
        <span>
          {value.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },

    // {
    //   title: "Số lượng",
    //   dataIndex: "quantity",
    //   key: "quantity",
    //   width: 120,
    // },
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
      <Table
        columns={columns}
        dataSource={dataProduct}
        pagination={{
          defaultPageSize: 7,
        }}
        rowKey={"id"}
      />
    </div>
  );
};
export default TableProduct;
