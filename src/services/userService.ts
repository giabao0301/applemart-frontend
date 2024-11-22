import { AxiosResponse } from "axios";
import axiosClient from ".";
import { getToken } from "./cookieService";
import { User } from "@/types/user";
import { ApiResponse } from "@/types/apiResponse";
import { UpdateProfileFormData } from "@/types/form";

export const getUserInfo = async (): Promise<User> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await axiosClient.get(
      "users/profile",
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

export const updateProfile = async (
  id: number,
  data: UpdateProfileFormData
): Promise<User> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await axiosClient.put(
      `users/${id}`,
      data,
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
