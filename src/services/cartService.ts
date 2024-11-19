import axiosClient from "./index";
import { ApiResponse } from "@/types/apiResponse";
import { AxiosResponse } from "axios";
import {
  CartItem,
  CartItemDeletionRequest,
  CartItemRequest,
} from "@/types/cart";
import { getToken } from "./localStorageService";

interface PageResponse<T> {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalElements: number;
  content: T[];
}

export const getCartItems = async (userId: number): Promise<CartItem[]> => {
  const response: AxiosResponse<ApiResponse<CartItem[]>> =
    await axiosClient.get(`/carts/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  return response.data.data;
};

export const addCartItem = async (
  userId: number,
  data: CartItemRequest
): Promise<string> => {
  const response: ApiResponse<string> = await axiosClient.post(
    `/carts/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

export const updateCartItem = async (
  userId: number,
  data: CartItemRequest
): Promise<string> => {
  const response: ApiResponse<string> = await axiosClient.put(
    `/carts/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

export const deleteCartItem = async (
  userId: number,
  data: CartItemDeletionRequest
): Promise<string> => {
  const response: ApiResponse<string> = await axiosClient.delete(
    `/carts/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      data: data,
    }
  );
  return response.data;
};

export const deleteAllCartItems = async (userId: number): Promise<string> => {
  const response: ApiResponse<string> = await axiosClient.delete(
    `/carts/all/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};
