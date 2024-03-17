// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
  },
  construction: {
    root: path(ROOTS_DASHBOARD, '/construction'),
    list: path(ROOTS_DASHBOARD, '/construction/list'),
    create: path(ROOTS_DASHBOARD, '/construction/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/construction/${id}/edit`),
    history: (id) => path(ROOTS_DASHBOARD, `/construction/${id}/history`),
  },
  employee: {
    root: path(ROOTS_DASHBOARD, '/employee'),
    create: path(ROOTS_DASHBOARD, '/employee/new'),
    list: path(ROOTS_DASHBOARD, '/employee/list'),
    edit: (id) => path(ROOTS_DASHBOARD, `/employee/${id}/edit`),
  },
};

