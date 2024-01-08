import { Button, Checkbox, Form, Input } from "antd";
import background from "../assets/images/bg-login.jpg";
import { LockOutlined } from "@ant-design/icons";
import store from "../store";
import { login } from "../store/actions/actionLogin";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
const LoginPage = () => {
  const onFinish = (values: any) => {
    store.dispatch(login(values.username, values.password));
  };
  useDocumentTitle("Đăng nhập");

  const navigate = useNavigate();
  const userLogin: any = useSelector<any>((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.accessToken) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div
      className="login-section user-section"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="login-wrapper">
        <div className="login-title">Đăng nhập</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<i className="fa-regular fa-user"></i>}
              placeholder="Email hoặc tên tài khoản"
              bordered={false}
              className="input-login"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
              bordered={false}
              className="input-login"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Nhớ mật khẩu</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item className="btn-submit">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LoginPage;
