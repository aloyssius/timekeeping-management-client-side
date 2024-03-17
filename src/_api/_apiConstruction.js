function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_CONSTRUCTION = '/constructions';

export const API_CONSTRUCTION = {
  getAll: path(ROOTS_CONSTRUCTION, ''),
  post: path(ROOTS_CONSTRUCTION, ''),
  put: (id) => path(ROOTS_CONSTRUCTION, `/${id}`),
  delete: (id) => path(ROOTS_CONSTRUCTION, `/${id}`),
  details: (id) => path(ROOTS_CONSTRUCTION, `/${id}`),
  history: (id) => path(ROOTS_CONSTRUCTION, `/${id}/history`),
}
