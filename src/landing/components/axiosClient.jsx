import axios from "axios";

// Pull the API base from .env (fallback for local)
const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: you can add interceptors here for auth tokens
axiosClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
