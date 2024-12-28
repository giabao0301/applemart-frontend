import axios from "axios";
import { refreshToken } from "./authService";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    if (error.response?.status === 403) {
      try {
        await refreshToken();
        return axios(error.config);
      } catch (refreshError) {
        console.log("Error refreshing token:", refreshError);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
