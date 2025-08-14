import { useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { saveUser, clearUser as clearUserStorage } from "../lib/userStore";
import type { User } from "../types/interfaces";

export const useUser = () => {
  const { user, setUser, logout } = useContext(AuthContext);

  const setAndPersist = useCallback(
    (u: User) => {
      setUser(u);
      saveUser(u);
    },
    [setUser],
  );

  const clearUser = useCallback(() => {
    clearUserStorage();
    setUser(null);
  }, [setUser]);

  return { user, setUser: setAndPersist, clearUser, logout };
};
