import axiosClient from "./index";
import { Category, Option, Product, ProductItem } from "@/types/product";
import { ApiResponse } from "@/types/apiResponse";
import { AxiosResponse } from "axios";

interface PageResponse<T> {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalElements: number;
  content: T[];
}

export const getProductItemsFromCart = async (
  userId: number
): Promise<ProductItem> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductItem>> =
      await axiosClient.get(`/carts/${userId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
