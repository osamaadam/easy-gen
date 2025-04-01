import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { LocalStorageKeys } from "../enums/local-storage-keys";
import { refreshRequest } from "./auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error is unauthorized and we haven't tried refreshing the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(
          LocalStorageKeys.REFRESH_TOKEN
        );
        if (!refreshToken) {
          // No refresh token available, reject with original error
          return Promise.reject(error);
        }

        const response = await refreshRequest(refreshToken);

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
        localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
        localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
        localStorage.removeItem(LocalStorageKeys.USER);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
