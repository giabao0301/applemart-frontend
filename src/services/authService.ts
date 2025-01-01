import {
  ChangePasswordFormData,
  LoginFormData,
  PasswordResetFormData,
  Email,
  SignupFormData,
} from "@/types/form";
import axiosClient from "./index";
import { ApiResponse } from "@/types/apiResponse";
import { AxiosResponse } from "axios";
import { TokenValidationResponse } from "@/types/auth";

export const signup = async (data: SignupFormData) => {
  const response = await axiosClient.post("/auth/signup", data);
  return response;
};

export const login = async (data: LoginFormData) => {
  const response = await axiosClient.post("/auth/login", data);
  return response;
};

export const logout = async () => {
  return (await axiosClient.get("/auth/logout")).data;
};

export const refreshToken = async () => {
  return (await axiosClient.post("/auth/refresh")).data;
};

export const introspectToken = async (): Promise<boolean> => {
  const response: AxiosResponse<ApiResponse<TokenValidationResponse>> =
    await axiosClient.get("/auth/introspect");

  return response.data.data.isValid;
};

export const requestEmailVerification = async (data: Email) => {
  const response = await axiosClient.post("/auth/resend-activation", {
    data,
  });
  return response.data;
};

export const confirmRegistrationEmail = async (token: string) => {
  const response: AxiosResponse<string> = await axiosClient.get(
    `/auth/registration/confirm?token=${token}`
  );

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
    data
  );

  return response.data;
};

export const requestPasswordReset = async (data: Email): Promise<void> => {
  const response = await axiosClient.post("/auth/reset-password", data);
  return response.data;
};

export const resetPassword = async (
  email: string,
  data: PasswordResetFormData,
  token: string
) => {
  await axiosClient.put(`/auth/reset-password?token=${token}`, {
    ...data,
    email: email,
  });
};

export const loginWithGoogle = async () => {
  const response = await axiosClient.get("/auth/login/oauth2/success");

  return response;
};
