import { useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import type { User } from "../types/interfaces";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  const addUser = useCallback(
    (user: User) => {
      setUser(user);
      setItem("user", JSON.stringify(user));
    },
    [setItem, setUser],
  );

  const clearUser = useCallback(() => {
    setUser(null);
    removeItem("user");
  }, [removeItem, setUser]);

  return { user, addUser, clearUser, setUser };
};
