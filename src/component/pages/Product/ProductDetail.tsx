import { Button, Form, Input, Modal, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableProductDetail from "./TableProductDetail";
import store from "../../../store";
import {
  createProductDetail,
  deleteProductDetail,
  getProductDetail,
  updateProductDetail,
} from "../../../store/actions/actionProduct";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Products } from "../../../constants";
enum FLAG {
  EDIT,
  CREATE,
}
const { Option } = Select;
const ProductDetail = () => {
  const [flag, setFlag] = useState(FLAG.CREATE);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dataProduct: any = useSelector<any>(
    (state) => state.productReducer.products
  );
  const fetchData = async () => {
    store.dispatch(getProductDetail());
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
  const onFinish = (value: any) => {
    if (flag === FLAG.CREATE) {
      store.dispatch(createProductDetail(value, notify));
    } else {
      store.dispatch(updateProductDetail(value, notify));
    }
  };
  const deletePrdDetail = (id: number) => {
    store.dispatch(deleteProductDetail(id, notify));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="product-detail-admin content-manager">
      <Button type="primary" onClick={openCreate} icon={<PlusOutlined />}>
        Thêm sản phẩm chi tiết
      </Button>
      <TableProductDetail
        openEdit={openEdit}
        deletePrdDetail={deletePrdDetail}
      />
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

          <Form.Item name="id_product" label="Sản phẩm">
            <Select placeholder="Vui lòng chọn màu">
              {dataProduct.map((item: Products) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.productName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="color" label="Màu sắc">
            <Select placeholder="Vui lòng chọn màu">
              <Option value="purple">Purple</Option>
              <Option value="silver">Silver</Option>
              <Option value="gold">Gold</Option>
              <Option value="white">White</Option>
              <Option value="black">Black</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Tồn kho" name="quantity">
            <Input placeholder="Nhập số lượng" autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default ProductDetail;
