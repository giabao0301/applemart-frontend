import { AxiosResponse } from "axios";
import axiosClient from ".";
import { ApiResponse } from "@/types/apiResponse";
import { getToken } from "./cookieService";

export const createOrder = async (order: NewOrderRequest) => {
  try {
    const response: AxiosResponse<OrderCreationResponse> =
      await axiosClient.post("orders", order, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async (userId: number): Promise<Order[]> => {
  try {
    const response: AxiosResponse<ApiResponse<Order[]>> = await axiosClient.get(
      `orders/search?userId=${userId}`,
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
      await axiosClient.get("payments", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
