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

export const getProducts = async ({
  page,
  size,
  sort,
  dir,
}: {
  page: number;
  size: number;
  sort: string;
  dir: string;
}): Promise<PageResponse<Product>> => {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<Product>>> =
      await axiosClient.get(
        `/products?page=${page}&size=${size}&sort=${sort}&dir=${dir}`
      );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response: AxiosResponse<Product> = await axiosClient.get(
    `/products/slug/${slug}`
  );
  return response.data;
};

export const getProductByCategory = async (
  category: string
): Promise<Product[]> => {
  const response: AxiosResponse<ApiResponse<Product[]>> = await axiosClient.get(
    `/products/category/${category}`
  );
  return response.data.data;
};

export const getProductItemBySlug = async (
  slug: string
): Promise<ProductItem> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductItem>> =
      await axiosClient.get(`/productItems?slug=${slug}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProductItemsByProductId = async (
  id: number
): Promise<ProductItem[]> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductItem[]>> =
      await axiosClient.get(`/products/${id}/productItems`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProductItemById = async (id: number): Promise<ProductItem> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductItem>> =
      await axiosClient.get(`/productItems/${id}`);
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
