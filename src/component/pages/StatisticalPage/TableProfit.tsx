import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { convertPriceToVND } from "../../../constants";

interface DataType {
  idProduct: number;
  product_name: string;
  import_price: number;
  sold: number;
  profit: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên sản phẩm",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Giá nhập",
    dataIndex: "import_price",
    key: "import_price",
    render: (value) => <span>{convertPriceToVND.format(value)}</span>,
  },
  {
    title: "Đã bán",
    dataIndex: "sold",
    key: "sold",
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profit",
    key: "profit",
    render: (value) => <span>{convertPriceToVND.format(value)}</span>,
  },
];

const TableProfit = ({ data }: any) => {
  return (
    <Table columns={columns} rowKey={"productdetail_id"} dataSource={data} />
  );
};

export default TableProfit;
