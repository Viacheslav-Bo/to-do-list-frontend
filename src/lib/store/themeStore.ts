import { create } from "zustand";

type ThemeMode = "light" | "dark";

type ThemeStore = {
  theme: ThemeMode;
  initializeTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const applyTheme = (theme: ThemeMode) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
};

const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  //   return window.matchMedia("(prefers-color-scheme: dark)").matches ?
  //       "dark"
  //     : "light";
  return "dark";
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "dark",
  initializeTheme: () => {
    const theme = getStoredTheme();
    applyTheme(theme);
    set({ theme });
  },
  setTheme: (theme) => {
    applyTheme(theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", nextTheme);
      }
      return { theme: nextTheme };
    });
  },
}));
