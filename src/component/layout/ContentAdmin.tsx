import React, { useState, ReactNode, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ToolOutlined,
  HomeOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  MessageOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Badge,
  Avatar,
  Tooltip,
  Dropdown,
} from "antd";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import store from "../../store";
import { logout } from "../../store/actions/actionLogin";
import { useSelector } from "react-redux";
import { ENV_BE } from "../../constants";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <NavLink className={"nav-admin"} to={"/"}>
      {"Trang chủ"}
    </NavLink>,
    "1",
    <HomeOutlined />
  ),
  getItem(
    <NavLink className={"nav-admin"} to={"thong-ke"}>
      {"Thống kê"}
    </NavLink>,
    "2",
    <PieChartOutlined />
  ),
  getItem(
    <NavLink className={"nav-admin"} to={"don-hang"}>
      {"Đơn hàng"}
    </NavLink>,
    "order",
    <ShoppingCartOutlined />
  ),
  getItem(
    <NavLink className={"nav-admin"} to={"khuyen-mai"}>
      {"Khuyến mại"}
    </NavLink>,
    "promotion",
    <TagOutlined />
  ),
  getItem("Quản lý", "sub1", <ToolOutlined />, [
    getItem(
      <NavLink className={"nav-admin"} to={"category"}>
        {"Danh mục"}
      </NavLink>,
      "category"
    ),
    getItem(
      <NavLink className={"nav-admin"} to={"product"}>
        {"Sản phẩm"}
      </NavLink>,
      "product"
    ),

    getItem(
      <NavLink className={"nav-admin"} to={"customer"}>
        {"Người dùng"}
      </NavLink>,
      "customer"
    ),
  ]),
];
const itemsDropdown: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a href="/">
        <i className="fa-solid fa-user"></i>
        Thông tin tài khoản
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a href="/">
        <i className="fa-solid fa-gear"></i>
        Cài đặt
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <span
        onClick={() => {
          store.dispatch(logout());
        }}
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất
      </span>
    ),
  },
];

const { Header, Sider, Content } = Layout;

const ContentAdmin = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dataUser: any = useSelector<any>((state) => state.userLogin.userInfo);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          bottom: 0,
          height: "100vh",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{ background: colorBgContainer }}
        >
          <div className="left-header">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <span className="admin-header-title"></span>
          </div>
          <div className="right-header">
            <Tooltip placement="bottomLeft" title="Tin nhắn">
              <Badge size="small" count={5}>
                <MessageOutlined style={{ fontSize: 24 }} />
              </Badge>
            </Tooltip>
            <Tooltip placement="bottom" title="Thông báo">
              <Badge size="small" count={5}>
                <BellOutlined style={{ fontSize: 24 }} />
              </Badge>
            </Tooltip>
            <div className="avatar-user">
              <Dropdown
                menu={{ items: itemsDropdown }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <Avatar
                  size={32}
                  src={`${ENV_BE}/getPhoto/${dataUser?.user.avatar}`}
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default ContentAdmin;
