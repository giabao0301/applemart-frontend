import { AxiosResponse } from "axios";
import axiosClient from ".";
import { ApiResponse, PageResponse } from "@/types/apiResponse";
import {
  NewOrderRequest,
  Order,
  OrderCreationResponse,
  OrderStats,
  PaymentMethod,
  ShippingMethod,
} from "@/types/order";

export const createOrder = async (order: NewOrderRequest) => {
  try {
    const response: AxiosResponse<OrderCreationResponse> =
      await axiosClient.post("orders", order);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  try {
    const response: AxiosResponse<ApiResponse<Order[]>> = await axiosClient.get(
      `orders/search?userId=${userId}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getShippingMethods = async () => {
  try {
    const response: AxiosResponse<ApiResponse<ShippingMethod[]>> =
      await axiosClient.get("shippingMethods");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentMethods = async () => {
  try {
    const response: AxiosResponse<ApiResponse<PaymentMethod[]>> =
      await axiosClient.get("payments");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async ({
  page,
  size,
  sort,
  dir,
}: {
  page: number;
  size: number;
  sort: string;
  dir: string;
}): Promise<PageResponse<Order>> => {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<Order>>> =
      await axiosClient.get(
        `/orders?page=${page}&size=${size}&sort=${sort}&dir=${dir}`
      );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (order: Order) => {
  try {
    const response: AxiosResponse<ApiResponse<Order>> = await axiosClient.put(
      `orders/${order.id}`,
      order
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrderById = async (orderId: number) => {
  try {
    const response: AxiosResponse<ApiResponse<Order>> =
      await axiosClient.delete(`orders/${orderId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderStats = async () => {
  try {
    const response: AxiosResponse<ApiResponse<OrderStats>> =
      await axiosClient.get("orders/stats");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
