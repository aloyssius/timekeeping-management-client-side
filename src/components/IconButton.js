import PropTypes from 'prop-types';
import { Button } from 'antd';


IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
}

export default function IconButton({ name, type = 'primary', icon, ...other }) {
  return (
    <Button
      type={type}
      style={{ height: "35px" }}
      icon={icon}
      {...other}
    >
      <span className='fw-500' style={{ fontWeight: 500 }}>
        {name}
      </span>
    </Button>
  )

}
