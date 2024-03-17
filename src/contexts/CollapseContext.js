import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

// ----------------------------------------------------------------------

const initialState = {
  isCollapse: false,
  onToggleCollapse: () => { },
};

const CollapseContext = createContext(initialState);

// ----------------------------------------------------------------------

CollapseProvider.propTypes = {
  children: PropTypes.node,
};

function CollapseProvider({ children }) {
  const [isCollapse, setIsCollapse] = useState(initialState.isCollapse);

  const handleToggleCollapse = () => {
    setIsCollapse(!isCollapse);
  }

  return (
    <CollapseContext.Provider
      value={{
        isCollapse: isCollapse,
        onToggleCollapse: handleToggleCollapse,
      }}

    >
      {children}
    </CollapseContext.Provider>
  )

}
export { CollapseProvider, CollapseContext }


