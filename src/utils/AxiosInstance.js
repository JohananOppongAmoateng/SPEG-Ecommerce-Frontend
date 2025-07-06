// lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.PUBLIC_API_BASE_URL || "http://localhost:3020", // default to localhost for development
    withCredentials: true,
});

export default axiosInstance;
