import PropTypes from 'prop-types';
import { Avatar as AvatarAntd } from 'antd';

AvatarName.propTypes = {
  displayName: PropTypes.string,
  displayNameStyle: PropTypes.object,
}

export default function AvatarName({ displayName, displayNameStyle, ...other }) {

  // const { user } = useAuth();
  // if (user) {
  // return (
  //   <Avatar 
  // size={size}
  // src={src}
  // icon={icon}
  // {...other}
  // >
  // </Avatar>
  // }

  return (
    <div className='d-flex'>
      <AvatarAntd
        {...other}
      />
      <span className='d-block fw-500 pointer ms-7' style={{ ...displayNameStyle }}>{displayName}</span>
    </div>

  )

}

