import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import DashboardLayout from '../layouts';
// import ConstructionList from '../pages/dashboard/construction/ConstructionList';
// layouts
// import MainLayout from '../layouts/main';
// import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
// import GuestGuard from '../guards/GuestGuard';
// import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
// import { PATH_AFTER_LOGIN } from '../config';
// import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  window.scrollTo(0, 0);
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // {
    //   path: 'auth',
    //   children: [
    //     {
    //       path: 'login',
    //       element: (
    //         <GuestGuard>
    //           <Login />
    //         </GuestGuard>
    //       ),
    //     },
    //     {
    //       path: 'register',
    //       element: (
    //         <GuestGuard>
    //           <Register />
    //         </GuestGuard>
    //       ),
    //     },
    //     { path: 'login-unprotected', element: <Login /> },
    //     { path: 'register-unprotected', element: <Register /> },
    //     { path: 'reset-password', element: <ResetPassword /> },
    //     { path: 'verify', element: <VerifyCode /> },
    //   ],
    // },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        // <AuthGuard>
        //   <DashboardLayout />
        // </AuthGuard>
        <DashboardLayout />
      ),
      children: [
        // { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        // { path: 'analytics', element: <GeneralAnalytics /> },
        {
          path: 'construction',
          children: [
            { element: <Navigate to="/dashboard/construction/list" replace />, index: true },
            { path: 'list', element: <ConstructionList /> },
            { path: 'new', element: <ConstructionCreateEdit /> },
            { path: ':id/edit', element: <ConstructionCreateEdit /> },
            { path: ':id/history', element: <ConstructionHistoryTimeKeeping /> },
          ],
        },
        {
          path: 'employee',
          children: [
            { element: <Navigate to="/dashboard/employee/list" replace />, index: true },
            { path: 'list', element: <EmployeeList /> },
            // { path: 'new', element: <UserCreate /> },
            // { path: ':id/edit', element: <UserCreate /> },
          ],
        },
      ],
    },

    { path: '/', element: <Navigate to="/dashboard/employee/list" replace /> },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
// const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// const Register = Loadable(lazy(() => import('../pages/auth/Register')));
// const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
// const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
// const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));

// CONSTRUCTION
const ConstructionList = Loadable(lazy(() => import('../pages/dashboard/construction/ConstructionList')));
const ConstructionCreateEdit = Loadable(lazy(() => import('../pages/dashboard/construction/ConstructionCreateEdit')));
const ConstructionHistoryTimeKeeping = Loadable(lazy(() => import('../pages/dashboard/construction/ConstructionHistoryTimeKeeping')));
// const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
// const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
// const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// EMPLOYEE
// const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
// const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const EmployeeList = Loadable(lazy(() => import('../pages/dashboard/employee/EmployeeList')));
// const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
// const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

