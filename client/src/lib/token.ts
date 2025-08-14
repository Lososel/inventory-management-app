export const getToken = () => sessionStorage.getItem("access_token");
export const setToken = (token: string) =>
  sessionStorage.setItem("access_token", token);
export const clearToken = () => sessionStorage.removeItem("access_token");
