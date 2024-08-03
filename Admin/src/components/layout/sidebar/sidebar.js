import { 
  BarsOutlined, 
  DashboardOutlined, 
  FormOutlined, 
  ShoppingCartOutlined, 
  ShoppingOutlined, 
  UserOutlined, 
  TeamOutlined, 
  AuditOutlined, 
  AppstoreOutlined, 
  PercentageOutlined, 
  FileTextOutlined 
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import "./sidebar.css";

const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar() {

  const history = useHistory();
  const location = useLocation();

  const menuSidebarAdmin = [
    {
      key: "dash-board",
      title: "Dashboards",
      link: "/dash-board",
      icon: <DashboardOutlined />
    },
    {
      key: "account-management",
      title: "Quản Lý Tài Khoản",
      link: "/account-management",
      icon: <UserOutlined />
    },
    {
      key: "product-list",
      title: "Danh sách sản phẩm",
      link: "/product-list",
      icon: <AppstoreOutlined />
    },
    {
      key: "quyen-management",
      title: "Quản lý phân quyền",
      link: "/quyen-management",
      icon: <AuditOutlined />
    },
    {
      key: "nha-cung-cap-management",
      title: "Quản lý nhà cung cấp",
      link: "/nha-cung-cap-management",
      icon: <TeamOutlined />
    },
    {
      key: "nhan-vien-management",
      title: "Quản lý nhân viên",
      link: "/nhan-vien-management",
      icon: <TeamOutlined />
    },
    {
      key: "loai-san-pham",
      title: "Loại sản phẩm",
      link: "/loai-san-pham",
      icon: <AppstoreOutlined />
    },
    {
      key: "hang",
      title: "Quản lý mặt hàng",
      link: "/hang",
      icon: <ShoppingOutlined />
    },
    {
      key: "dot-giam-gia",
      title: "Đợt giảm giá",
      link: "/dot-giam-gia",
      icon: <PercentageOutlined />
    },
    {
      key: "don-dat-hang",
      title: "Đơn đặt hàng",
      link: "/don-dat-hang",
      icon: <FileTextOutlined />
    },
    {
      key: "donhang",
      title: "Đơn hàng",
      link: "/donhang",
      icon: <ShoppingCartOutlined />
    },
  ];
  const navigate = (link, key) => {
    history.push(link);
  }

  useEffect(() => {
  })

  return (
    <Sider
      className={'ant-layout-sider-trigger'}
      width={215}
      style={{
        position: "fixed",
        top: 55,
        height: '100%',
        left: 0,
        padding: 0,
        zIndex: 1,
        marginTop: 0,
        boxShadow: " 0 1px 4px -1px rgb(0 0 0 / 15%)"
      }}
    >
     <Menu
          mode="inline"
          selectedKeys={location.pathname.split("/")}
          defaultOpenKeys={['account']}
          style={{ height: '100%', borderRight: 0, backgroundColor: "#FFFFFF" }}
          theme='light'
        >

          {
            menuSidebarAdmin.map((map) => (
              <Menu.Item
                onClick={() => navigate(map.link, map.key)}
                key={map.key}
                icon={map.icon}
                className="customeClass"
              >
                {map.title}
              </Menu.Item>
            ))
          }
        </Menu>

    </Sider >
  );
}

export default Sidebar;