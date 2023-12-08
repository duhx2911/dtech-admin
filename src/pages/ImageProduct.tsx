import { useEffect, useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { NotificationPlacement } from "antd/es/notification/interface";
import TableImage from "../component/pages/ImageProduct/TableImage";
import axios from "axios";
import { ENV_BE, Products } from "../constants";
import { useSelector } from "react-redux";
import store from "../store";
import { getListProduct } from "../store/actions/actionProduct";
import {
  createImageProduct,
  getImageProduct,
} from "../store/actions/imgProductAction";
enum FLAG {
  EDIT,
  CREATE,
}
const { Option } = Select;
type NotificationType = "success" | "info" | "warning" | "error";
const ImageProductPage = () => {
  useDocumentTitle("Ảnh sản phẩm");
  const [flag, setFlag] = useState(FLAG.CREATE);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const dataProduct: any = useSelector<any>(
    (state) => state.productReducer.products
  );
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const fetchData = async () => {
    store.dispatch(getListProduct());
    store.dispatch(getImageProduct());
  };
  const openCreate = () => {
    setFlag(FLAG.CREATE);
    setOpen(true);
    setFileList([]);
    form.resetFields();
  };
  const openEdit = (record: any) => {
    setFlag(FLAG.EDIT);
    form.setFieldsValue(record);
    setOpen(true);
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
  const normFile = async (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log("event", e);
    return e?.fileList;
  };

  const onFinish = async (value: any) => {
    if (flag === FLAG.CREATE) {
      const imgUrl = await value?.imgUrl;

      imgUrl.map(async (item: any) => {
        const newValues = { ...value, imgUrl: item.response.filename };
        console.log(newValues);
        await store.dispatch(createImageProduct(newValues));
      });
      form.resetFields();
      setOpen(false);
      // store.dispatch(createCategory(value, notify));
    } else {
      // store.dispatch(updateCategory(value, value.id, notify));
    }
  };
  const deleteImage = async (value: any) => {
    const fileName = value.response.filename;
    await axios.delete(`${ENV_BE}/getPhoto/${fileName}`);
  };
  const deleteCate = (id: number) => {
    //   store.dispatch(deleteCategory(id, notify));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="category-admin content-manager">
        <Button type="primary" onClick={openCreate} icon={<PlusOutlined />}>
          Thêm ảnh
        </Button>
        <TableImage openEdit={openEdit} deleteCate={deleteCate} />
        <Modal
          title={flag === FLAG.CREATE ? "Thêm ảnh" : "Sửa ảnh sản phẩm"}
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

            <Form.Item name="productId" label="Sản phẩm">
              <Select placeholder="Vui lòng chọn">
                {dataProduct.map((item: Products) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.productName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="color" label="Màu">
              <Select placeholder="Vui lòng chọn">
                <Option value="Purple">Purple</Option>
                <Option value="Silver">Silver</Option>
                <Option value="Gold">Gold</Option>
                <Option value="Blue">Blue</Option>
                <Option value="Black">Black</Option>
                <Option value="Natural">Natural</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="imgUrl"
              label="Ảnh"
              valuePropName="myFile"
              getValueFromEvent={normFile}
            >
              <Upload
                action={`${ENV_BE}/uploadfile`}
                listType="picture-card"
                name="myFile"
                fileList={fileList}
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleChange}
                onRemove={deleteImage}
                multiple={true}
              >
                {uploadButton}
              </Upload>
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
export default ImageProductPage;
