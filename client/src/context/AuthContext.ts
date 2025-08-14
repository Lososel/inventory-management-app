import { createContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "../types/interfaces";

export type AuthCtx = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthCtx>({
  user: null,
  setUser: () => undefined,
  logout: () => undefined,
});
