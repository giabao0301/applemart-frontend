import {
  ChangePasswordFormData,
  LoginFormData,
  SignupFormData,
} from "@/types/form";
import axiosClient from "./index";
import { getToken, removeToken, setToken } from "./localStorageService";
import { Token, TokenValidationResponse } from "@/types/auth";
import { ApiResponse } from "@/types/apiResponse";
import { AxiosResponse } from "axios";

export const signup = async (data: SignupFormData) => {
  const response = await axiosClient.post("/auth/signup", data);

  setToken(response.headers["authorization"]);

  return response;
};

export const login = async (data: LoginFormData) => {
  const response = await axiosClient.post("/auth/login", data);

  setToken(response.headers["authorization"]);

  return response;
};

export const isValidToken = async (data: Token): Promise<boolean> => {
  const response: AxiosResponse<ApiResponse<TokenValidationResponse>> =
    await axiosClient.post("/auth/introspect", data);

  return response.data.data.isValid;
};

export const logout = () => {
  removeToken();
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = getToken();
  if (token) {
    const isValid: boolean = await isValidToken({ token });
    if (!isValid) {
      removeToken();
      return false;
    }

    return true;
  }

  return false;
};

export const changePassword = async (
  data: ChangePasswordFormData
): Promise<string> => {
  const response: AxiosResponse<string> = await axiosClient.put(
    "/auth/change-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};
