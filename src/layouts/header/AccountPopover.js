import React, { useState } from 'react';
import { Popover, Avatar, Divider, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './account-popover-style.css'

export const AccountPopover = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={
        <>
          <Divider dashed style={{ margin: "10px 0" }} />
          <Link to={'/'} style={{ color: "red" }}>
            <div className='logout'>
              Đăng xuất
            </div>
          </Link>
        </>
      }
      title={
        <>
          <span>Trần Quang Hiền</span>
          <span className='d-block fw-400'>(Admin)</span>
        </>
      }
      placement='bottomRight'
      overlayStyle={{ width: "150px" }}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Avatar style={{ cursor: "pointer" }} size={40} icon={<UserOutlined />} />
    </Popover>
  )
}
