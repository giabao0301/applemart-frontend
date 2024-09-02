import axiosClient from "./index";

export const getProducts = async () => {
  return await axiosClient.get("/products");
};

export const getProductsById = async (id: number) => {
  return await axiosClient.get(`/products/${id}`);
};
