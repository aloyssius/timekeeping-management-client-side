import _mock from "./_mock";

export const _employee = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  fullName: `ABCDEFG ${index}`,
  phoneNumber: `09090909${index}`
}));
