"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/store/themeStore";

export default function ThemeInitializer() {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return null;
}
