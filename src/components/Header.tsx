import React from "react";
import { Layout, Menu } from "antd";
import {
  CloudSyncOutlined,
  CheckCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, Redirect, useLocation } from "react-router-dom";
import Uploader from "./Uploader";

const { Header } = Layout;

export default function (): JSX.Element {
  const { pathname } = useLocation();
  const allRoutes = ["/", "/finished", "/config"];
  return (
    <>
      {allRoutes.includes(pathname) ? null : <Redirect to="/" />}
      <Header className="app-header">
        <div className="app-header__prepend"><Uploader /></div>
        <Menu selectedKeys={[pathname]} theme="dark" mode="horizontal">
          <Menu.Item key="/" icon={<CloudSyncOutlined />}>
            <Link to="/">正在转音</Link>
          </Menu.Item>
          <Menu.Item key="/finished" icon={<CheckCircleOutlined />}>
            <Link to="/finished">已完成</Link>
          </Menu.Item>
          <Menu.Item key="/config" icon={<SettingOutlined />}>
            <Link to="/config">设置</Link>
          </Menu.Item>
        </Menu>
        <div className="app-header__append"></div>
      </Header>
    </>
  );
}
