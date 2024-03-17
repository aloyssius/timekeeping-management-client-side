export const displayCurrencyVnd = (data) => {
  return data?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export const formatCurrencyVnd = (data) => {
  const hasNonZeroNumber = /\d*[1-9]\d*/.test(data);

  if (hasNonZeroNumber) {
    return data
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "";
  }
};

export const formatNumber = (data) => {
  return data
    .replace(/[^0-9]+/g, "");
};
