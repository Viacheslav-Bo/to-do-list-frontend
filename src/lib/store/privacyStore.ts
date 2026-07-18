import { create } from "zustand";

interface PrivacyStore {
  isPrivacyModeOn: boolean;
  toggle: () => void;
}

export const usePrivacyStore = create<PrivacyStore>()((set) => ({
  isPrivacyModeOn: true,
  toggle: () => set((state) => ({ isPrivacyModeOn: !state.isPrivacyModeOn })),
}));
