import { useEffect, useCallback } from "react";
import { useUser } from "./useUser";
import type { User } from "../types/interfaces";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { user, addUser, clearUser, setUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const cached = getItem("user");
    if (cached) {
      try {
        addUser(JSON.parse(cached) as User);
      } catch {
        clearUser();
      }
    }
  }, []);

  const login = useCallback(
    (user: User, token?: string) => {
      if (token) sessionStorage.setItem("access_token", token);
      addUser(user);
    },
    [addUser],
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem("access_token");
    clearUser();
  }, [clearUser]);

  return { user, login, logout, setUser };
};
