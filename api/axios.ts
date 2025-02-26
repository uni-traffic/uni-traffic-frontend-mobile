import { getItem } from "@/lib/tokenStorage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.14:3000/api/v1",
  // baseURL: "https://uni-traffic-backend.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  async (config) => {
    const token = await getItem("AUTH_TOKEN");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
