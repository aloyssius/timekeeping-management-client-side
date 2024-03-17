import React, { useState } from 'react';
import useResponsive from '../hooks/useResponsive';
import DashboardHeader from "./header";
import NavbarVertical from "./navbar/NavbarVertical"
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './navbar/navbar-vertical-style.css'
import useCollapse from '../hooks/useCollapse';

const { Content } = Layout;

const layoutStyle = {
  overflowY: 'hidden',
};

const DashboardLayout = () => {
  const { isCollapse } = useCollapse();
  const { isMobile } = useResponsive();
  const [open, setOpen] = useState(false);

  return (
    <Layout style={layoutStyle}>
      <NavbarVertical
        isCollapse={isCollapse}
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />

      <Layout>
        <DashboardHeader
          onOpenSidebar={() => setOpen(true)}
        />
        <Content
          style={{
            padding: isMobile ? "85px 10px 0px 10px" : isCollapse ? '85px 15px 0px 105px' : '85px 15px 0px 275px',
            minHeight: "calc(100vh)",
            backgroundColor: "#f7f7f7"
          }}
        >
          <Outlet />
          <div style={{ marginTop: "10px" }}></div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default DashboardLayout;
