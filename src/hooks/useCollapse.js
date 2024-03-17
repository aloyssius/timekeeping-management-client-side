import { useContext } from 'react';
import { CollapseContext } from '../contexts/CollapseContext';

const useCollapse = () => useContext(CollapseContext);

export default useCollapse;
