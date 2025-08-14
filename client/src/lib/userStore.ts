import type { User } from "../types/interfaces";

const KEY = "user";

export const loadUser = (): User | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    localStorage.removeItem(KEY);
    return null;
  }
};

export const saveUser = (user: User) =>
  localStorage.setItem(KEY, JSON.stringify(user));
export const clearUser = () => localStorage.removeItem(KEY);
