import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://backend-nine-zeta-50.vercel.app"
    : "http://localhost:3000",
});

export default axiosPublic;
