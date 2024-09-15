import { LoginFormData, SignupFormData } from "@/types/form";
import axiosClient from "./index";
import { getToken, removeToken, setToken } from "./localStorageService";

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

export const logout = () => {
  removeToken();
};

export const isAuthenticated = (): boolean => {
  if (getToken()) {
    return true;
  }
  return false;
};
