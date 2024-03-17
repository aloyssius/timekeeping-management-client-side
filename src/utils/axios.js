import axios from 'axios';
import { HOST_API } from '../config';

export const client = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

// client.interceptors.request.use((config) => {
//   const token = Cookies.get("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export const clientGet = (url, params) => {
  return client.get(url, { params })
}

export const clientPost = (url, data) => {
  return client.post(url, data);
};

export const clientPut = (url, data) => {
  return client.put(url, data);
};

export const clientDelele = (url) => {
  return client.delete(url);
};

export const clientUploadImage = (url, file, headers) => {
  const formData = new FormData();
  formData.append('image', file);

  return client.post(url, formData, { headers });
};

export const clientImportExcel = (url, file, headers) => {
  const formData = new FormData();
  formData.append('excel', file);

  return client.post(url, formData, { headers });
};

export const clientExportExcel = (url, params, headers) => {
  return client.get(url, {
    params,
    headers,
    responseType: 'blob',
  });
};


