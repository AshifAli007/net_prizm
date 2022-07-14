import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CalendarOutlined,
  UserOutlined,
  WifiOutlined,
  MobileOutlined,
  DashboardOutlined,
  DesktopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export default function SideBar() {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const labels = [
    "Calender",
    "User",
    "Technology",
    "Profile Section",
    "Speed",
    "Device Name",
    "Log Out",
  ];
  const items = [
    CalendarOutlined,
    UserOutlined,
    WifiOutlined,
    MobileOutlined,
    DashboardOutlined,
    DesktopOutlined,
    LogoutOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `${labels[index]}`,
    onClick: (e) => {
      console.log();
      if(e.key === "4")
      {
        navigate("/profile");
      }
      if (e.key === "7") {
        navigate("/login");
      }
    },
  }));
  return (
    <>
      <Sider
        collapsible
        defaultCollapsed
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          margin: 0,
          zIndex: 100,
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
    </>
  );
}
