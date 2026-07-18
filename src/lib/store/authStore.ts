import { create } from "zustand";

import type { User } from "@/types/user";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isChecking: boolean;
  setUser: (user: User | null) => void;
  setChecking: (value: boolean) => void;
  clearIsAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  isChecking: true,
  setUser: (user) => {
    set(() => ({ user, isAuthenticated: user !== null }));
  },
  setChecking: (value) => set(() => ({ isChecking: value })),
  clearIsAuth: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
