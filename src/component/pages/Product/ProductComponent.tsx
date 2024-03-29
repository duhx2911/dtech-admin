import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import store from "../../../store";
import {
  createProduct,
  deleteProduct,
  getListProduct,
  updateProduct,
} from "../../../store/actions/actionProduct";
import { getListCategory } from "../../../store/actions/actionCategories";
import { storageFB } from "../../../firebase";
import TableProduct from "./TableProduct";

const { Option } = Select;
enum FLAG {
  EDIT,
  CREATE,
}
const ProductComponent = () => {
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(FLAG.CREATE);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [editData, setEditData] = useState({
    id: null,
    product_code: null,
    product_name: null,
    category_id: null,
    capacity: null,
    color: null,
    quantity: null,
    import_price: null,
    price: null,
    slug: null,
    artwork: null,
  });
  const [form] = Form.useForm();
  const dataCategories: any = useSelector<any>(
    (state) => state.categoryReducer.categories
  );
  const notify = (status: any) => {
    if (status === "success") {
      message.success("Thành công");
      form.resetFields();
      setOpen(false);
    } else {
      message.error("Thất bại");
    }
  };

  const fetchData = async () => {
    store.dispatch(getListProduct());
    store.dispatch(getListCategory());
  };
  const openCreate = () => {
    setFlag(FLAG.CREATE);
    setOpen(true);
    setFileList([]);
    form.resetFields();
  };
  const openEdit = async (record: any) => {
    setFlag(FLAG.EDIT);
    form.setFieldsValue(record);
    const httpsReference = await ref(storageFB, record.artwork);
    setFileList([
      {
        uid: `${record.id}`,
        name: httpsReference.name,
        url: record.artwork,
        thumbUrl: record.artwork,
      },
    ]);
    setEditData(
      form.getFieldsValue([
        "id",
        "product_name",
        "category_id",
        "capacity",
        "import_price",
        "price",
        "slug",
        "artwork",
      ])
    );
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = async (value: any) => {
    if (flag === FLAG.CREATE) {
      const imgRef = ref(storageFB, `images/${value.artwork.fileList[0].name}`);
      await uploadBytes(imgRef, value.artwork.fileList[0].originFileObj);
      const url = await getDownloadURL(imgRef);
      const body = await { ...value, artwork: url };
      await store.dispatch(createProduct(body, notify));
    } else {
      if (JSON.stringify(editData) !== JSON.stringify(value)) {
        const body = value;
        if (editData.artwork !== value.artwork) {
          const imgRef = ref(
            storageFB,
            `images/${value.artwork.fileList[0].name}`
          );
          await uploadBytes(imgRef, value.artwork.fileList[0].originFileObj);
          const url = await getDownloadURL(imgRef);
          body.artwork = url;
        }
        store.dispatch(updateProduct(body, notify));
      }
    }
  };
  const deletePrd = (id: number) => {
    store.dispatch(deleteProduct(id, notify));
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="product-admin content-manager">
        <Button type="primary" onClick={openCreate} icon={<PlusOutlined />}>
          Thêm sản phẩm
        </Button>
        <TableProduct openEdit={openEdit} deletePrd={deletePrd} />
        <Drawer
          title={
            flag === FLAG.CREATE
              ? "Thêm sản phẩm mới"
              : flag === FLAG.EDIT
              ? "Sửa sản phẩm"
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
              <Col span={24}>
                <Form.Item
                  name="product_name"
                  label="Tên sản phẩm"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="category_id"
                  label="Danh mục"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Select placeholder="Vui lòng chọn">
                    {dataCategories.map((item: any) => {
                      return (
                        <Option value={item.id} key={item.id}>
                          {item.category_name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="capacity"
                  label="Dung lượng"
                  tooltip="Có thể bỏ qua"
                >
                  <Select placeholder="Vui lòng chọn">
                    <Option value={128}>128 GB</Option>
                    <Option value={256}>256 GB</Option>
                    <Option value={512}>512 GB</Option>
                    <Option value={1024}>1 TB</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="import_price"
                  label="Giá nhập"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                >
                  <Input placeholder="Giá nhập" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Giá bán"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                >
                  <Input placeholder="Nhập giá bán" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="slug"
                  label="Đường dẫn"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                >
                  <Input placeholder="Nhập đường dẫn" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="artwork"
                  label="Ảnh"
                  valuePropName="filelist"
                  rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                >
                  <Upload
                    action=""
                    listType="picture"
                    fileList={fileList}
                    accept=".png,.jpg,.jpeg,.webp"
                    beforeUpload={(file: any) => {
                      return false;
                    }}
                    maxCount={1}
                    onChange={handleChange}
                  >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  </Upload>
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
export default ProductComponent;
