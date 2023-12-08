import { Button, Col, Drawer, Form, Input, Row, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import store from "../store";
import { NotificationPlacement } from "antd/es/notification/interface";
import TableStaff from "../component/pages/Staff/TableStaff";
import { getListStaff } from "../store/actions/actionStaff";
import useDocumentTitle from "../hooks/useDocumentTitle";
enum FLAG {
  EDIT,
  CREATE,
}
type NotificationType = "success" | "info" | "warning" | "error";
const StaffPage = () => {
  useDocumentTitle("Quản lý nhân viên");
  const [flag, setFlag] = useState(FLAG.CREATE);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const fetchData = async () => {
    store.dispatch(getListStaff());
  };
  const openCreate = () => {
    setFlag(FLAG.CREATE);
    setOpen(true);
    form.resetFields();
  };
  const openEdit = (record: any) => {
    setFlag(FLAG.EDIT);
    form.setFieldsValue(record);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const openNotification = (
    placement: NotificationPlacement,
    type: NotificationType,
    mess: string
  ) => {
    api[type]({
      message: mess,
      placement,
    });
  };
  const notify = (status: any) => {
    if (status === "success") {
      openNotification("top", "success", "Thành công");
      form.resetFields();
      setOpen(false);
    } else {
      openNotification("top", "error", "Vui lòng thử lại");
    }
  };

  const onFinish = (value: any) => {
    console.log(">>> value: ", value);
  };
  const deleteCate = (id: number) => {
    console.log("delete");
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <>
      {contextHolder}
      <div className="category-admin content-manager">
        <Button type="primary" onClick={openCreate} icon={<PlusOutlined />}>
          Thêm người dùng
        </Button>
        <TableStaff openEdit={openEdit} deleteCate={deleteCate} />
        <Drawer
          title={
            flag === FLAG.CREATE
              ? "Thêm nhân viên mới"
              : flag === FLAG.EDIT
              ? "Sửa nhân viên"
              : ""
          }
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {flag === FLAG.EDIT ? (
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="id" label="id">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
            ) : null}

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="fullname"
                  label="Tên"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Input placeholder="Nhập tên nhân viên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="Tên người dùng"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Input placeholder="Nhập tên người dùng" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Input placeholder="Nhập mật khẩu" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Button
                    className="button-submit"
                    type="primary"
                    htmlType="submit"
                  >
                    Lưu
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    </>
  );
};
export default StaffPage;
