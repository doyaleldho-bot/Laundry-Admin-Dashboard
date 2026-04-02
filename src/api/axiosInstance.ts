import axios from "axios";
import { toast } from "react-toastify";

let isRedirecting = false; 

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  // baseURL: "http://localhost:5001/api",/
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      try {

        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/refresh-token`,
          {},
          { withCredentials: true }
        );

        return api(originalRequest);

      } catch (err) {

        if (!isRedirecting) {

          isRedirecting = true;

          toast.warning("Session expired. Please login again.");

          localStorage.removeItem("adm");

          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);

        }

      }

    }

    return Promise.reject(error);

  }
);