import axios from 'axios';

const axiosInstance = axios.create({
  // 환경변수에 /api 달아라
  baseURL: `${process.env.REACT_APP_SERVER}`,
  withCredentials: true,
});

// Add an interceptor to the Axios instance
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
