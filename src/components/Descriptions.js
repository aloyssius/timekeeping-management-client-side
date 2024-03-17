import PropTypes from 'prop-types';
import { Space, Card, Descriptions as DescriptionsAntd } from "antd"
import { HeaderAction } from './HeaderSection';
import IconButton from './IconButton';

Descriptions.propTypes = {
  items: PropTypes.array.isRequired,
  style: PropTypes.object,
}

const labelStyle = {
  color: 'black',
  fontWeight: 500,
  fontSize: '16px',
}

export default function Descriptions({ items, style, ...other }) {

  return (
    <DescriptionsAntd
      style={{ ...style }}
      layout='vertical'
      {...other}
    >
      {items && items.map((item, index) => {
        return (
          <Descriptions.Item key={index} label={<span style={labelStyle}>{item.label}</span>}>
            {item.node ? item.node : <span style={item.style}>{item.text}</span>}
          </Descriptions.Item>
        )
      })}
    </DescriptionsAntd>
  )
}
