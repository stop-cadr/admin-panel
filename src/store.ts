import { create } from "zustand";
import {
  postRegisterData,
  postLoginData,
  RegisterInputs,
  LoginInputs,
} from "./services";

interface User {
  email: string;
  name?: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: boolean;
  setUser: (user: User) => void;
  register: (data: RegisterInputs) => Promise<void>;
  login: (data: LoginInputs) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: false,
  setUser: (user) => set({ user, isAuthenticated: true, error: false }),
  register: async (data: RegisterInputs) => {
    try {
      set({ error: false });
      const response = await postRegisterData(data);
      if (response?.token) {
        localStorage.setItem("token", response.token);
        set({
          user: { email: data.email, name: data.name, password: data.password },
          isAuthenticated: true,
        });
      }
    } catch (error) {
      set({ error: true });
      console.error("Ошибка регистрации:", error);
    }
  },

  login: async (data: LoginInputs) => {
    try {
      set({ error: false });
      const response = await postLoginData(data);
      if (response?.token) {
        localStorage.setItem("token", response.token);
        set({
          user: { email: data.email, password: data.password },
          isAuthenticated: true,
        });
      } else {
        set({ error: true });
      }
    } catch (error) {
      set({ error: true });
      console.error("Ошибка авторизации:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false, error: false });
  },
}));
