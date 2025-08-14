import { useCallback } from "react";
import { useUser } from "./useUser";
import { setToken, clearToken } from "../lib/token";
import type { User } from "../types/interfaces";

export const useAuth = () => {
  const { user, setUser, clearUser, logout } = useUser();

  const login = useCallback(
    (u: User, token?: string) => {
      if (token) setToken(token);
      setUser(u);
    },
    [setUser],
  );

  const localLogout = useCallback(() => {
    clearToken();
    clearUser();
  }, [clearUser]);

  return { user, login, logout: localLogout ?? logout };
};
