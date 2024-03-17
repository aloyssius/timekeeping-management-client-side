import { Button, Modal as ModalAntd } from 'antd';
import PropTypes from 'prop-types';
import { ExclamationCircleFilled } from "@ant-design/icons";
import useResponsive from '../hooks/useResponsive';

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.node,
  onFinish: PropTypes.func,
  onClose: PropTypes.func,
  confirm: PropTypes.bool,
  children: PropTypes.node,
  width: PropTypes.number,
  icon: PropTypes.node,
  buttonConfirmText: PropTypes.string,
  buttonCancelText: PropTypes.string,
  footer: PropTypes.node,
}

const titleIconStyle = {
  marginLeft: '10px',
  fontSize: '16.5px',
}

const titleStyle = {
  fontSize: '16.5px',
}

export default function Modal({
  isOpen, title, onFinish, onClose, confirm, children, width, icon, buttonCancelText, buttonConfirmText, footer, ...other }) {
  const { isMobile } = useResponsive();

  return (
    <ModalAntd
      width={isMobile ? 450 : width ? width : 500}
      open={isOpen}
      title={
        confirm ?
          <>
            <ExclamationCircleFilled style={{ fontSize: "25px", color: 'orange' }} />
            <span style={titleIconStyle}>{title}</span>
          </>
          : icon ?
            <>
              {icon}
              <span style={titleIconStyle}>{title}</span>
            </>
            :
            <span style={titleStyle}>{title}</span>
      }
      onCancel={onClose}
      footer={[
        <>
          {footer &&
            footer ||
            <>
              <Button onClick={onClose}>{buttonCancelText}</Button>
              <Button onClick={onFinish} type='primary'>{buttonConfirmText}</Button>
            </>
          }
        </>
      ]}
      {...other}
    >
      <div style={{ marginLeft: confirm ? '35px' : icon ? '35px' : '' }}>
        {children}
      </div>
    </ModalAntd>
  )

}
