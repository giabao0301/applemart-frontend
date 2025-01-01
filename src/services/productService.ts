import axiosClient from "./index";
import { ApiResponse, PageResponse } from "@/types/apiResponse";
import {
  Category,
  Option,
  Product,
  ProductFormData,
  ProductItem,
  ProductStats,
} from "@/types/product";
import { AxiosResponse } from "axios";

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

export const getProductItemsByProductSlug = async (
  slug: string
): Promise<ProductItem[]> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductItem[]>> =
      await axiosClient.get(`/products/productItems?${slug}`);
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

export const searchProductItem = async (
  slug: string,
  page: number,
  size: number,
  sort: string,
  dir: string,
  minPrice: string,
  maxPrice: string
): Promise<PageResponse<ProductItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<ProductItem>>> =
      await axiosClient.get(
        `/productItems/search?slug=${slug}&page=${page}&size=${size}&sort=${sort}&dir=${dir}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSuggestions = async (query: string): Promise<string[]> => {
  try {
    const response: AxiosResponse<string[]> = await axiosClient.get(
      `/products/suggestions?query=${query}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductStats = async (): Promise<ProductStats> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductStats>> =
      await axiosClient.get("/products/stats");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryById = async (data: Category): Promise<Category> => {
  try {
    const response: AxiosResponse<ApiResponse<Category>> =
      await axiosClient.put(`/categories/${data.id}`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (data: Category): Promise<Category> => {
  try {
    const response: AxiosResponse<ApiResponse<Category>> =
      await axiosClient.post(`/categories`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryById = async (id: number): Promise<void> => {
  try {
    await axiosClient.delete(`/categories/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (
  data: ProductFormData
): Promise<ProductFormData> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductFormData>> =
      await axiosClient.post(`/products`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async (id: number): Promise<void> => {
  try {
    await axiosClient.delete(`/products/${id}`);
  } catch (error) {
    throw error;
  }
};

export const updateProductById = async (
  data: ProductFormData
): Promise<ProductFormData> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductFormData>> =
      await axiosClient.put(`/products/${data.id}`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
