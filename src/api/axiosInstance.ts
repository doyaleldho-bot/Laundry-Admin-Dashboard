import axios from "axios";
import { toast } from "react-toastify";

let isRedirecting = false; 

export const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true; 

      toast.warning("Session expired. Please login again.");

      localStorage.removeItem("isLoggedIn");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }

    return Promise.reject(error);
  }
);