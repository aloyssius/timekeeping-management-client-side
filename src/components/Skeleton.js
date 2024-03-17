import PropTypes from 'prop-types';
import { Skeleton as SkeletonAntd } from 'antd';
import '../assets/css/style-component.css'

export default function Skeleton({ loading, size, component, style, type, ...other }) {

  if (type === 'input')

    return (
      loading ? (
        <SkeletonAntd.Input
          style={{ ...style }}
          active
          size={size}
          {...other}
        />
      ) : (
        component
      )
    );

  if (type === 'table') {
    return (
      loading &&
      [...Array(5)].map((_, index) => (
        <SkeletonAntd.Input
          key={index}
          className={index > 0 && `mt-5`}
          style={{ ...style }}
          active
          size={size}
          {...other}
        />
      ))
    )
  }

}

Skeleton.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.string,
  component: PropTypes.node,
  style: PropTypes.object,
  type: PropTypes.string,
}


