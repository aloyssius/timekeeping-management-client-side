import PropTypes from 'prop-types';
import useResponsive from '../../hooks/useResponsive';
import CollapseButton from './CollapseButton';
import { Logo, LogoCollapse } from '../../components/Logo';
import { Layout } from 'antd';
import './header-style.css'
import { AccountPopover } from './AccountPopover';
import useCollapse from '../../hooks/useCollapse';

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
}

const { Header } = Layout;

export default function DashboardHeader({ onOpenSidebar }) {
  const { isCollapse, onToggleCollapse } = useCollapse();
  const { isMobile } = useResponsive();

  return (
    <Header style={{
      display: "flex",
      justifyContent: "space-between",
      padding: isCollapse ? "0 20px" : isMobile ? "0 20px" : "",
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '70px',
      zIndex: 100,
      backgroundColor: 'white',
    }}>
      <div className='header-left' style={{ display: "flex", alignItems: "center" }}>
        {!isMobile && (isCollapse ? <LogoCollapse /> : <Logo />)}
        <CollapseButton
          onToggleCollapse={onToggleCollapse}
          isCollapse={isCollapse}
          onOpenSidebar={onOpenSidebar}
        />
      </div>
      <div className='header-right' style={{ position: !isMobile ? "absolute" : "", right: !isMobile ? "30px" : "20px" }}>
        <AccountPopover />
      </div>
    </Header>
  )
}

