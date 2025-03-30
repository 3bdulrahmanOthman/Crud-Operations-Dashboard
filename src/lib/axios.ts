import axios from "axios";
import { getErrorMessage } from "./handle-error";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", getErrorMessage(error));
    return Promise.reject(getErrorMessage(error));
  }
);

export default api;
