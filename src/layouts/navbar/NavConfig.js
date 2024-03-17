// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { FaHotel, FaUsers } from "react-icons/fa6";

const ICONS = {
  construction: <FaHotel color='#38B6FF' size={15} />,
  employee: <FaUsers color='#38B6FF' size={15} />,
}

const navConfig = [
  {
    items: [
      // CONSTRUCTION
      {
        title: 'Quản lý công trình',
        path: PATH_DASHBOARD.construction.list,
        icon: ICONS.construction,
      }
    ]
  },

  {
    items: [
      // EMPLOYEE
      {
        title: 'Quản lý công nhân',
        path: PATH_DASHBOARD.employee.list,
        icon: ICONS.employee,
        // children: [
        //   { title: 'create', path: PATH_DASHBOARD.employee.list },
        //   { title: 'create', path: PATH_DASHBOARD.employee.create },
        //   { title: 'edit', path: PATH_DASHBOARD.employee.edit },
        // ]
      }
    ]
  }
]

export default navConfig;
