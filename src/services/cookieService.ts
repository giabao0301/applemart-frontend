export const KEY_TOKEN = "accessToken";

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    document.cookie = `${KEY_TOKEN}=${token}; path=/; Expires=${date.toUTCString()}; SameSite=Strict`;
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) =>
      cookie.startsWith(`${KEY_TOKEN}=`)
    );
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    document.cookie = `${KEY_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};
