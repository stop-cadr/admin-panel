import { create } from "zustand";
import {
  getUserData,
  postRegisterData,
  postLoginData,
  updateUserData,
} from "./services";
import { AuthState } from "./types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: Boolean(localStorage.getItem("token")),
  error: null,
  isLoading: true,

  getMe: async () => {
    set({ isLoading: true });
    try {
      const userData = await getUserData();
      if (userData) {
        set({ user: userData, isAuthenticated: true });
      } else {
        set({
          isAuthenticated: false,
          error: "Не удалось получить данные пользователя",
        });
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      set({ isAuthenticated: false, error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      await postRegisterData(data);
      set({ isAuthenticated: true });
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка регистрации:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await postLoginData(data);
      if (response?.token) {
        localStorage.setItem("token", response.token);
        const userData = await getUserData();
        if (userData) {
          set({ user: userData, isAuthenticated: true });
        } else {
          set({ error: "Не удалось получить данные пользователя" });
        }
      } else {
        set({ error: "Ошибка авторизации" });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка авторизации:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false, error: null });
  },

  updateUser: async (id, userData) => {
    set({ isLoading: true });
    try {
      const updatedUser = await updateUserData(id, userData);
      if (updatedUser) {
        set({ user: updatedUser, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Ошибка обновления данных пользователя:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
