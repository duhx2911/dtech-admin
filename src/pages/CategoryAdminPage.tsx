import { Button, Form, Input, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import TableCategory from "../component/pages/CategoryPage/TableCategory";
import store from "../store";
import {
  createCategory,
  deleteCategory,
  getListCategory,
  updateCategory,
} from "../store/actions/actionCategories";

import useDocumentTitle from "../hooks/useDocumentTitle";
enum FLAG {
  EDIT,
  CREATE,
}

const CategoryAdminPage = () => {
  const [flag, setFlag] = useState(FLAG.CREATE);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useDocumentTitle("Danh mục");

  const fetchData = async () => {
    store.dispatch(getListCategory());
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
  const notify = (status: any) => {
    if (status === "success") {
      message.success("Thành công");
      form.resetFields();
      setOpen(false);
    } else {
      message.error("Vui lòng thử lại");
    }
  };

  const onFinish = (value: any) => {
    if (flag === FLAG.CREATE) {
      store.dispatch(createCategory(value, notify));
    } else {
      store.dispatch(updateCategory(value, value.id, notify));
    }
  };
  const deleteCate = (id: number) => {
    store.dispatch(deleteCategory(id, notify));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="category-admin content-manager">
        <Button type="primary" onClick={openCreate} icon={<PlusOutlined />}>
          Thêm danh mục
        </Button>
        <TableCategory openEdit={openEdit} deleteCate={deleteCate} />
        <Modal
          title={flag === FLAG.CREATE ? "Thêm danh mục" : "Sửa danh mục"}
          centered
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {flag === FLAG.EDIT ? (
              <Form.Item label="ID" name="id">
                <Input readOnly disabled />
              </Form.Item>
            ) : null}

            <Form.Item label="Tên danh mục" name="category_name">
              <Input placeholder="Nhập tên danh mục" autoComplete="off" />
            </Form.Item>

            <Form.Item label="Đường dẫn" name="slug">
              <Input placeholder="Nhập đường dẫn" autoComplete="off" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default CategoryAdminPage;
