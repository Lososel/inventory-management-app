import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "../types/interfaces";
import { AuthContext } from "./AuthContext";
import { fetchMe } from "../api/auth.service";
import {
  loadUser,
  saveUser,
  clearUser as clearUserStorage,
} from "../lib/userStore";
import { getToken, clearToken } from "../lib/token";

function restoreUser(setUser: (u: User | null) => void) {
  const u = loadUser();
  if (u) setUser(u);
}

async function verifyTokenAndRefreshUser(setUser: (u: User | null) => void) {
  const token = getToken();
  if (!token) return;
  try {
    const fresh = await fetchMe();
    setUser(fresh);
    saveUser(fresh);
  } catch {
    clearToken();
    clearUserStorage();
    setUser(null);
  }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => restoreUser(setUser), []);
  useEffect(() => {
    void verifyTokenAndRefreshUser(setUser);
  }, []);

  const logout = () => {
    clearToken();
    clearUserStorage();
    setUser(null);
  };

  const value = useMemo(() => ({ user, setUser, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
