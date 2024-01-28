import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  message,
} from "antd";
import TableDiscount from "../component/pages/DiscountPage/TableDiscount";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import store from "../store";
import {
  createPromotion,
  getListPromotion,
} from "../store/actions/promotionAction";
import { useSelector } from "react-redux";
import { getListCategory } from "../store/actions/actionCategories";
import { getListProduct } from "../store/actions/actionProduct";
import { Categories, ENV_BE, Products } from "../constants";
import axios from "axios";
enum FLAG {
  EDIT,
  CREATE,
}
const { Option } = Select;
const DiscountPage = () => {
  useDocumentTitle("Khuyến mại");
  const [flag, setFlag] = useState(FLAG.CREATE);
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [typediscount, setTypediscount] = useState("");
  const [discount, setDiscount] = useState({});
  const [form] = Form.useForm();
  const listDiscount: any = useSelector<any>(
    (state) => state.promotionReducer.discounts
  );
  const listProduct: any = useSelector<any>(
    (state) => state.productReducer.products
  );
  const listCategory: any = useSelector<any>(
    (state) => state.categoryReducer.categories
  );
  const onFinish = async (value: any) => {
    if (value.listDiscount === "categories") {
      const res = await axios.put(`${ENV_BE}/discount/${value.listProduct}`, {
        discount: value.valueDiscount,
      });
      if (res.status === 200) {
        if (res.data.status === "success") {
          setOpen(false);
          setIsCreate(false);
          setTypediscount("");
          form.resetFields();
          message.success("Thêm khuyến mại thành công");
        } else {
          message.error("Vui lòng thử lại");
        }
      }
    }
    if (value.listDiscount === "products") {
      let isUpdate = false;
      await value.listProduct.map(async (item: any) => {
        const res = await axios.put(`${ENV_BE}/products/${item}`, {
          discount: value.valueDiscount,
        });
        console.log(res);
        if (res.status === 200) {
          if (res.data.status === "success") {
            isUpdate = true;
          } else {
            isUpdate = false;
          }
        }
      });
      setTimeout(() => {
        if (isUpdate) {
          setOpen(false);
          setIsCreate(false);
          setTypediscount("");
          form.resetFields();
          message.success("Thêm khuyến mại thành công");
        } else {
          message.error("Vui lòng thử lại");
        }
      }, 1000);
    }
  };
  const openCreate = () => {
    setFlag(FLAG.CREATE);
    setOpen(true);
    setIsCreate(false);
    setTypediscount("");
    form.resetFields();
  };
  const fetchData = () => {
    store.dispatch(getListPromotion());
    store.dispatch(getListCategory());
    store.dispatch(getListProduct());
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="discount-page content-manager">
      <Button type="primary" onClick={openCreate} icon={<PlusOutlined />}>
        Thêm khuyến mại
      </Button>
      <TableDiscount />
      <Modal
        title={flag === FLAG.CREATE ? "Thêm khuyến mại" : "Sửa khuyến mại"}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="listDiscount"
            label="Khuyến mại theo"
            rules={[{ required: true }]}
          >
            <Radio.Group
              onChange={(e) => {
                setTypediscount(e.target.value);
              }}
            >
              <Radio value="categories">Danh mục</Radio>
              <Radio value="products">Sản phẩm</Radio>
            </Radio.Group>
          </Form.Item>
          {typediscount.length ? (
            <Form.Item name="listProduct" label="Chọn sản phẩm">
              {typediscount === "categories" ? (
                <Select placeholder="Hãy chọn sản phẩm">
                  {listCategory.map((item: Categories) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.category_name}
                      </Option>
                    );
                  })}
                </Select>
              ) : typediscount === "products" ? (
                <Select mode="multiple" placeholder="Hãy chọn sản phẩm">
                  {listProduct.map((item: Products) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.product_name}
                      </Option>
                    );
                  })}
                </Select>
              ) : null}
            </Form.Item>
          ) : null}

          <Form.Item name="valueDiscount" label="Chọn khuyến mại">
            <Select placeholder="Chọn giá trị khuyến mại">
              {listDiscount.map((item: any) => {
                return (
                  <Option key={item.promotion_code} value={item.promotion_code}>
                    {item.value}%
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {isCreate ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Space.Compact style={{ width: "90%" }}>
                <Input
                  placeholder="Nhập mã khuyến mại"
                  onChange={(e) =>
                    setDiscount({
                      ...discount,
                      promotion_code: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Nhập giá trị khuyến mại"
                  onChange={(e) =>
                    setDiscount({ ...discount, value: e.target.value })
                  }
                />
                <Button
                  htmlType="button"
                  onClick={() => {
                    store.dispatch(
                      createPromotion(discount, setIsCreate(false))
                    );
                  }}
                  type="primary"
                >
                  Thêm
                </Button>
              </Space.Compact>
              <Button
                onClick={() => setIsCreate(false)}
                htmlType="button"
                shape="circle"
                danger
              >
                <CloseOutlined />
              </Button>
            </div>
          ) : (
            <p
              className="create-discount"
              onClick={() => {
                setIsCreate(true);
              }}
            >
              Tạo khuyến mại mới
            </p>
          )}
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
export default DiscountPage;
