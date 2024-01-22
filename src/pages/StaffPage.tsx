import {
  Button,
  Col,
  DatePicker,
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
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import store from "../store";
import TableStaff from "../component/pages/Staff/TableStaff";
import {
  createStaff,
  deleteStaff,
  getListStaff,
  updateStaff,
} from "../store/actions/actionStaff";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { ENV_BE } from "../constants";
import dayjs from "dayjs";
import axios from "axios";
enum FLAG {
  EDIT,
  CREATE,
}

const { Option } = Select;
const StaffPage = () => {
  useDocumentTitle("Quản lý nhân viên");
  const [flag, setFlag] = useState(FLAG.CREATE);
  const [open, setOpen] = useState(false);
  const [oldAvatar, setOldAvatar] = useState("");
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const deleteImage = (value: any) => {
    setFileList([]);
    axios
      .get(`${ENV_BE}/getPhoto/${value.name}`)
      .then((res) => {
        setOldAvatar(value.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchData = async () => {
    store.dispatch(getListStaff());
  };
  const openCreate = () => {
    setFlag(FLAG.CREATE);
    setOpen(true);
    form.resetFields();
    setFileList([]);
  };
  const openEdit = (record: any) => {
    setFlag(FLAG.EDIT);
    if (record.avatar && record.avatar !== "none-avatar.jpg") {
      setFileList([
        {
          uid: `${record.id}`,
          name: record.avatar,
          url: `${ENV_BE}/getPhoto/${record.avatar}`,
          thumbUrl: `${ENV_BE}/getPhoto/${record.avatar}`,
        },
      ]);
    } else {
      setFileList([]);
    }
    form.setFieldsValue({
      ...record,
      birthday: record.birthday ? dayjs(record.birthday, "YYYY-MM-DD") : null,
    });
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setOldAvatar("");
  };
  const normFile = async (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onResult = () => {
    setOpen(false);
    form.resetFields();
    message.success("Thành công");
  };
  const onCreate = async (value: any) => {
    const avatar = await value?.avatar;
    var bodyFormData = new FormData();
    bodyFormData.append("myFile", avatar[0].originFileObj);
    const res = await axios.post(`${ENV_BE}/uploadfile`, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status === 200) {
      const body = {
        ...value,
        birthday: value.birthday.format("YYYY-MM-DD"),
        avatar: res.data.filename,
      };
      store.dispatch(createStaff(body, onResult));
    }
  };
  const onUpdate = async (value: any) => {
    let body = {
      ...value,
      birthday: value.birthday.format("YYYY-MM-DD"),
    };
    if (oldAvatar) {
      axios.delete(`${ENV_BE}/getPhoto/${oldAvatar}`);
    }
    const avatar = await value?.avatar;
    if (avatar.length) {
      var bodyFormData = new FormData();
      bodyFormData.append("myFile", avatar[0].originFileObj);
      const res = await axios.post(`${ENV_BE}/uploadfile`, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        body = {
          ...value,
          birthday: value.birthday.format("YYYY-MM-DD"),
          avatar: res.data.filename,
        };
      }
      console.log(body);
    } else {
      body = {
        ...value,
        birthday: value.birthday.format("YYYY-MM-DD"),
        avatar: "none-avatar.jpg",
      };
      console.log(body);
    }

    store.dispatch(updateStaff(body, onResult));
    // console.log(value);
  };
  const onFinish = async (value: any) => {
    if (flag === FLAG.CREATE) {
      onCreate(value);
    } else {
      onUpdate(value);
    }
  };
  const delStaff = async (record: any) => {
    if (record.avatar) {
      axios.delete(`${ENV_BE}/getPhoto/${record.avatar}`);
    }
    store.dispatch(deleteStaff(record.id));
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <>
      <div className="category-admin content-manager">
        <Button type="primary" onClick={openCreate} icon={<PlusOutlined />}>
          Thêm người dùng
        </Button>
        <TableStaff openEdit={openEdit} delStaff={delStaff} />
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
                  <Input
                    placeholder="Nhập mật khẩu"
                    disabled={flag === FLAG.EDIT ? true : false}
                  />
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
              <Col span={12}>
                <Form.Item
                  name="role_id"
                  label="Phân quyền"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Select placeholder="Vui lòng chọn">
                    <Option value={1}>Admin</Option>
                    <Option value={2}>Nhân viên</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Giới tính"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Select placeholder="Vui lòng chọn">
                    <Option value="man">Nam</Option>
                    <Option value="woman">Nữ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="birthday"
                  label="Ngày sinh"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <DatePicker placeholder="Chọn ngày" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống!" },
                  ]}
                >
                  <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="avatar"
                  label="Ảnh đại diện"
                  valuePropName="myFile"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    listType="picture-card"
                    name="myFile"
                    fileList={fileList}
                    beforeUpload={() => {
                      return false;
                    }}
                    maxCount={1}
                    accept=".png,.jpg,.jpeg,.webp"
                    onChange={handleChange}
                    onRemove={deleteImage}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
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
export default StaffPage;
