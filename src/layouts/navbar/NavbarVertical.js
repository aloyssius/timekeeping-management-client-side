import PropTypes from 'prop-types';
import useResponsive from '../../hooks/useResponsive';
import { Layout, Menu, Drawer } from 'antd';
import './navbar-vertical-style.css'
import { LogoMobile } from '../../components/Logo';
import navConfig from './NavConfig';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

NavbarVertical.propTypes = {
  isCollapse: PropTypes.bool,
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

const { Sider } = Layout;

const menuStyle = {
  border: 'none'
};

const siderStyle = {
  height: '100vh',
  position: 'fixed',
  padding: '75px 7px 0px 7px',
  left: 0
};

const siderMobileStyle = {
  height: '100vh',
  position: 'fixed',
  padding: '5px 7px 0px 7px',
  left: 0
};

export default function NavbarVertical({ isCollapse, isOpenSidebar, onCloseSidebar }) {
  const { isMobile } = useResponsive();
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState('');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    setSelectedKey(pathname);
  }, [pathname]);

  return (
    <>
      {!isMobile ?
        <Sider className={`nav-vertical`}
          trigger={null}
          collapsible
          theme='light'
          collapsed={isCollapse}
          style={siderStyle}
          width={255}
          collapsedWidth={86}
        >
          <Menu style={menuStyle}
            theme="light"
            mode="inline"
            selectedKeys={selectedKey}
          >
            {navConfig.map((group) => {
              return group.items.map((list) => {
                return (
                  <Menu.Item
                    key={list.path}
                    icon={list.icon}
                  >
                    <Link to={list.path}>
                      <span style={{ fontWeight: 500, fontSize: "16px" }}>{list.title}</span>
                    </Link>
                  </Menu.Item>
                )
              })
            })}

          </Menu>
        </Sider>
        :
        <Drawer
          width={315}
          placement={'left'}
          closable={false}
          onClose={onCloseSidebar}
          open={isOpenSidebar}
        >
          <LogoMobile />
          <Sider className='nav-vertical-mobile'
            trigger={null}
            collapsible
            theme='light'
            width={300}
            style={siderMobileStyle}
          >
            <Menu style={menuStyle}
              theme="light"
              mode="inline"
              selectedKeys={selectedKey}
            >
              {navConfig.map((group) => {
                return group.items.map((list) => {
                  return (
                    <Menu.Item
                      key={list.path}
                      icon={list.icon}
                    >
                      <Link to={list.path}>
                        <span style={{ fontWeight: 500, fontSize: "16px" }}>{list.title}</span>
                      </Link>
                    </Menu.Item>
                  )
                })
              })}
            </Menu>
          </Sider>
        </Drawer>
      }
    </>
  )
}
