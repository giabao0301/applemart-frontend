import { LoginFormData } from "@/types/form";
import axiosClient from "./index";
import { getToken, removeToken, setToken } from "./localStorageService";

export const login = async (data: LoginFormData) => {
  const response = await axiosClient.post("/auth/login", data);

  setToken(response.headers["authorization"]);

  return response;
};

export const logout = () => {
  removeToken();
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};
