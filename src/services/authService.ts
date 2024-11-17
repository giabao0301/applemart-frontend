import {
  ChangePasswordFormData,
  LoginFormData,
  PasswordResetFormData,
  PasswordResetRequest,
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

export const confirmRegistrationEmail = async (token: string) => {
  const response: AxiosResponse<string> = await axiosClient.get(
    `/auth/registration/confirm?token=${token}`
  );

  setToken(response.headers["authorization"]);

  return response.data;
};

export const confirmPasswordResetEmail = async (token: string) => {
  const response: AxiosResponse<string> = await axiosClient.get(
    `/auth/reset-password/confirm?token=${token}`
  );

  return response.data;
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

export const requestPasswordReset = async (
  data: PasswordResetRequest
): Promise<void> => {
  await axiosClient.post("/auth/reset-password", data);
};

export const resetPassword = async (data: PasswordResetFormData) => {
  await axiosClient.put("/auth/reset-password", data);
};

export const loginWithGoogle = async () => {
  const response = await axiosClient.get("/auth/login/oauth2/success");

  setToken(response.headers["authorization"]);

  return response;
};
