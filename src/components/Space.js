import PropTypes from 'prop-types';
import { Space as SpaceAntd, Card } from 'antd';

Space.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  inner: PropTypes.bool,
}

export default function Space({ children, title, inner, ...other }) {

  return (
    <SpaceAntd
      className='d-flex mt-20'
      direction="vertical"
      {...other}
    >
      <Card
        type={inner && 'inner'}
        size='small'
        title={title}
      >
        {children}
      </Card>
    </SpaceAntd>
  )
}
