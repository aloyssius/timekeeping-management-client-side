import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        {meta}
      </Helmet>

      <div {...other} ref={ref}>
        {children}
      </div>
    </>
  )

});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
}


export default Page;
