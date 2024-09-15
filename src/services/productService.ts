import axiosClient from "./index";
import { Category, Option, Product, ProductItem } from "@/types/product";
import { AxiosResponse } from "axios";

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface PageResponse<T> {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalElements: number;
  content: T[];
}

export const getProducts = async (): Promise<PageResponse<Product>> => {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<Product>>> =
      await axiosClient.get(`/products`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByName = async (name: string): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await axiosClient.get(
      `/products/search?name=${name}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductItemBySlug = async (
  slug: string
): Promise<ProductItem> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductItem>> =
      await axiosClient.get(`/productItems/${slug}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProductItemsByProductName = async (
  name: string
): Promise<ProductItem[]> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductItem[]>> =
      await axiosClient.get(`/productItems?productName=${name}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<ApiResponse<Category[]>> =
      await axiosClient.get(`/categories`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getVariationOptionsByProductId = async (
  id: number
): Promise<Option[]> => {
  try {
    const response: AxiosResponse<Option[]> = await axiosClient.get(
      `/variationOptions?productId=${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
