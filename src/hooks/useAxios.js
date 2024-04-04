import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://recipe-persona-backend.vercel.app"
    : "http://localhost:3000",
});

export default axiosPublic;
