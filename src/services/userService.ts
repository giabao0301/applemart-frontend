import { AxiosResponse } from "axios";
import axiosClient from ".";
import { getToken } from "./localStorageService";
import { User } from "@/types/user";

interface UserResponse {
  status: string;
  message: string;
  data: User;
}

export const getUserInfo = async (): Promise<User> => {
  try {
    const response: AxiosResponse<UserResponse> = await axiosClient.get(
      "users/info",
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
