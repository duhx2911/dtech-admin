import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { convertPriceToVND } from "../../../constants";

interface DataType {
  idProduct: number;
  productName: string;
  import_price: number;
  sold: number;
  profit: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "idProduct",
    key: "idProduct",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "productName",
    key: "productName",
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
  return <Table columns={columns} rowKey={"idProduct"} dataSource={data} />;
};

export default TableProfit;
