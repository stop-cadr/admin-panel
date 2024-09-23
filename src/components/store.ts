import { create } from "zustand";

interface AuthState {
  user: {
    email: string;
    name?: string;
    password: string;
  } | null;
  isAuthenticated: boolean;
  setUser: (user: { email: string; name?: string; password: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
