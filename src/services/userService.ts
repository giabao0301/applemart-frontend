import { AxiosResponse } from "axios";
import axiosClient from ".";
import { User } from "@/types/user";
import { ApiResponse, PageResponse } from "@/types/apiResponse";
import { UpdateProfileFormData } from "@/types/form";

export const getUserProfile = async (): Promise<User> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await axiosClient.get(
      "users/profile"
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
      data
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (id: number): Promise<void> => {
  try {
    await axiosClient.delete(`users/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getUsers = async ({
  page,
  size,
  sort,
  dir,
}: {
  page: number;
  size: number;
  sort: string;
  dir: string;
}): Promise<PageResponse<User>> => {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<User>>> =
      await axiosClient.get(
        `/users?page=${page}&size=${size}&sort=${sort}&dir=${dir}`
      );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
