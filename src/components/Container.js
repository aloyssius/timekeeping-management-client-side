import PropTypes from 'prop-types';


Container.propTypes = {
  children: PropTypes.node.isRequired,
}

const containerStyle = {
  backgroundColor: 'white',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(90, 89, 89, 0.255)',
  padding: '20px',
}

export default function Container({ children, style, ...other }) {

  return (
    <>
      <div {...other} style={{ ...style, ...containerStyle }}>
        {children}
      </div>
    </>
  )

}
