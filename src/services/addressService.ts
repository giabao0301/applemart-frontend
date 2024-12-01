import { AxiosResponse } from "axios";
import axiosClient from ".";
import { ApiResponse } from "@/types/apiResponse";
import { getToken } from "./cookieService";
import { Address } from "@/types/user";

export const getAddresses = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Address[]>> =
      await axiosClient.get("users/addresses", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAddressById = async (id: number) => {
  try {
    const response: AxiosResponse<ApiResponse<Address>> = await axiosClient.get(
      `users/addresses/${id}`,
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

export const setDefaultAddress = async (addressId: number) => {
  try {
    const response: AxiosResponse<string> = await axiosClient.patch(
      `users/addresses/${addressId}/default`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAddress = async (address: Address) => {
  try {
    const response: AxiosResponse<ApiResponse<Address>> =
      await axiosClient.post("users/addresses", address, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (address: Address) => {
  try {
    const response: AxiosResponse<ApiResponse<Address>> = await axiosClient.put(
      `users/addresses/${address.id}`,
      address,
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

export const deleteAddress = async (addressId: number) => {
  try {
    const response: AxiosResponse<string> = await axiosClient.delete(
      `users/addresses/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
