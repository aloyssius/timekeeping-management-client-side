import PropTypes from 'prop-types';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import useResponsive from '../../hooks/useResponsive';

CollapseButton.propTypes = {
  onToggleCollapse: PropTypes.func,
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
}

export default function CollapseButton({ onToggleCollapse, isCollapse, onOpenSidebar }) {
  const { isMobile } = useResponsive();

  return (
    <div
      className="sidebar-toggle"
      onClick={isMobile ? onOpenSidebar : onToggleCollapse}
      style={{
        cursor: "pointer",
        marginLeft: isMobile ? "-5px" : !isCollapse ? "45px" : "",
        width: "32px",
        height: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#38B6FF",
        borderRadius: "50%",
        color: "#fff",
      }}
    >
      {isMobile ? <UnorderedListOutlined /> : isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  )
}
