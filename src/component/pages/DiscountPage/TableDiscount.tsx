import { Button, Image, Popconfirm, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Categories, convertPriceToVND } from "../../../constants";

import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
const TableDiscount = ({ openEdit, deleteCate }: any) => {
  const [data, setData] = useState([]);
  const { data: dataPromotion } = useFetch("promotion");
  useEffect(() => {
    if (dataPromotion && dataPromotion.length) {
      setData(dataPromotion);
    }
  }, [dataPromotion]);
  const columns: ColumnsType<Categories> = [
    {
      title: "Mã sản phẩm",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Ảnh",
      dataIndex: "artwork",
      key: "artwork",
      render: (value) => <Image width={80} src={value} />,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => <span>{convertPriceToVND.format(value)}</span>,
    },
    {
      title: "Khuyến mại",
      dataIndex: "val",
      key: "val",
      render: (value) => <span>{value}%</span>,
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
      dataSource={data}
      rowKey={"id"}
    />
  );
};
export default TableDiscount;
