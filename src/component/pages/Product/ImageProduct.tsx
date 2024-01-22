import { useEffect, useState } from "react";

import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import axios from "axios";
import { useSelector } from "react-redux";
import store from "../../../store";
import {
  createImageProduct,
  getImageProduct,
  getListProductImg,
} from "../../../store/actions/imgProductAction";
import { ENV_BE } from "../../../constants";
import TableImage from "./TableImage";

enum FLAG {
  EDIT,
  CREATE,
}
const { Option } = Select;

const ImageProduct = () => {
  const [flag, setFlag] = useState(FLAG.CREATE);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const dataProduct: any = useSelector<any>(
    (state) => state.imageProductReducer.productimgs
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
    store.dispatch(getImageProduct());
    store.dispatch(getListProductImg());
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

  const normFile = async (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log("event", e);
    return e?.fileList;
  };

  const onFinish = async (value: any) => {
    try {
      const imgUrl = await value?.imgUrl;

      imgUrl.map(async (item: any) => {
        const newValues = { ...value, imgUrl: item.response.filename };
        console.log(newValues);
        await store.dispatch(createImageProduct(newValues));
      });
      form.resetFields();
      setOpen(false);
      message.success("Thêm ảnh thành công");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteImage = async (value: any) => {
    const fileName = value.response.filename;
    await axios.delete(`${ENV_BE}/getPhoto/${fileName}`);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="category-admin content-manager">
        <Button type="primary" onClick={openCreate} icon={<PlusOutlined />}>
          Thêm ảnh
        </Button>
        <TableImage />
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

            <Form.Item name="id_productdetail" label="Sản phẩm">
              <Select placeholder="Vui lòng chọn">
                {dataProduct.map((item: any) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.productName} - {item.color}
                    </Option>
                  );
                })}
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
export default ImageProduct;
