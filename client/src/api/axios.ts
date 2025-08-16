import axios from "axios";
import { getToken, clearToken } from "../lib/token";
import { clearUser } from "../lib/userStore";
import i18n from "../i18n";

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers = config.headers ?? {};
  config.headers["Accept-Language"] = i18n.language?.startsWith("ru")
    ? "ru"
    : "en";
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      clearToken();
      clearUser();
      if (location.pathname !== "/login") {
        location.replace("/login");
      }
    }
    return Promise.reject(err);
  },
);
