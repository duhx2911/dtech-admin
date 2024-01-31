import { Avatar, Button, Popconfirm, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Categories, ENV_BE, dmyFormat } from "../../../constants";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const TableCustomer = ({ openEdit, delStaff }: any) => {
  const dataStaff: any = useSelector<any>((state) => state.staffReducer.staffs);
  const columns: ColumnsType<Categories> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (value: string) => (
        <Avatar shape="circle" size={64} src={`${ENV_BE}/getPhoto/${value}`} />
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (value: string) => (
        <p>{value ? (value === "man" ? "Nam" : "Nữ") : null}</p>
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      render: (value: string) => <p>{value ? dmyFormat(value) : null}</p>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn chắc chắn muốn xóa ?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => delStaff(record)}
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
      dataSource={dataStaff}
      rowKey={"id"}
      scroll={{ x: 1800 }}
    />
  );
};
export default TableCustomer;
