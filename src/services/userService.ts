import axiosClient from ".";
import { getToken } from "./localStorageService";

export const getUserInfo = async () => {
  return await axiosClient
    .get("users/info", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => res.data);
};
