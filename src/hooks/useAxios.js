import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://recipe-persona-backend-shantonoor-shanto-noors-projects.vercel.app"
    : "http://localhost:3000",
});

export default axiosPublic;
