// lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3020", // default to localhost for development
    withCredentials: true,
});

export default axiosInstance;
