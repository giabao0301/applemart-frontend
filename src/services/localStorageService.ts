export const KEY_TOKEN = "accessToken";

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY_TOKEN, token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(KEY_TOKEN);
  }
};

export const removeToken = () => {
  return localStorage.removeItem(KEY_TOKEN);
};
