import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

export const HeaderAction = ({ heading, action, headingStyle, style, headingCustom, ...other }) => {

  return (
    <div className='header-action d-flex justify-content-between' style={{ ...style }} {...other}>
      {headingCustom ? headingCustom :
        <span className='fw-500 fs-20' style={{ ...headingStyle }}>{heading}</span>
      }
      {action}
    </div>
  )

}

export const HeaderBreadcrumbs = ({ heading, action, links, headingStyle, style, ...other }) => {

  return (
    <>
      <div className='heading-action d-flex justify-content-between' style={{ ...style }}>
        <span className='fw-500 fs-20' style={{ ...headingStyle }}>{heading}</span>
        {action}
      </div>
      <Breadcrumb
        className='mt-10'
        style={{ ...style }}
        items={links}
        {...other}
      />
    </>
  )

}

HeaderAction.propTypes = {
  heading: PropTypes.string,
  action: PropTypes.node,
  headingStyle: PropTypes.object,
  headingCustom: PropTypes.node,
  style: PropTypes.object,
}

HeaderBreadcrumbs.propTypes = {
  heading: PropTypes.string,
  action: PropTypes.node,
  links: PropTypes.array,
  style: PropTypes.object,
  headingStyle: PropTypes.object,
}

