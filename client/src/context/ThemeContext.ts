import { createContext } from "react";

export type Theme = "light" | "dark";

type ThemeCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  setTheme: () => undefined,
  toggleTheme: () => undefined,
});
