import { Button, Image, Popconfirm, Space, message } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { ENV_BE, convertPriceToVND } from "../../../constants";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
const TableDiscount = () => {
  const [data, setData] = useState([]);
  const { data: dataPromotion } = useFetch("promotion");
  useEffect(() => {
    if (dataPromotion && dataPromotion.length) {
      setData(dataPromotion);
    }
  }, [dataPromotion]);
  const deleteDiscount = async (id: number) => {
    const res = await axios.put(`${ENV_BE}/products/${id}`, {
      discount: "none",
    });
    if (res.status === 200) {
      if (res.data.status === "success") {
        message.success("Xoá thành công");
      }
    }
  };
  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
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
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn chắc chắn muốn xóa sản phẩm này?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => deleteDiscount(record.id)}
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
      dataSource={data}
      rowKey={"id"}
    />
  );
};
export default TableDiscount;
