import { create } from "zustand";
import {
  postRegisterData,
  postLoginData,
  getUserData,
  updateUserData,
  addEployeesData,
  getEmployeesData,
} from "./services";
import type { LoginInputs, Usern } from "./types";
import type { FormData } from "@/pages/employees/types/types";
interface AuthState {
  user: Usern | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  employees: FormData[];
  status: boolean;
  register: (data: Omit<Usern, "id">) => Promise<void>;
  login: (data: LoginInputs) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
  getEmployees: () => Promise<void>;
  updateUser: (id: string | number, userData: Partial<Usern>) => Promise<void>;
  addEployees: (data: FormData) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: Boolean(localStorage.getItem("token")),
  error: null,
  isLoading: false,
  employees: [],
  status: false,

  getMe: async () => {
    try {
      set({ isLoading: true, error: null });
      const userData = await getUserData();
      console.log(userData);
      if (userData) {
        set({ user: userData, isAuthenticated: true, isLoading: false });
      } else {
        set({
          isAuthenticated: false,
          error: "Не удалось получить данные пользователя",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      set({ isAuthenticated: false, error: (error as Error).message });
    } finally {
      set({ isLoading: false, error: null });
    }
  },

  getEmployees: async () => {
    try {
      set({ isLoading: true, error: null, status: false });
      const employeeData = await getEmployeesData();
      if (employeeData) {
        set({ employees: employeeData, isLoading: false, status: true });
      }
    } catch (error) {
      console.error("Ошибка при получении данных сотрудниов:", error);
    }
  },

  register: async (data: Omit<Usern, "id">) => {
    try {
      set({ error: null });
      await postRegisterData(data);
      set({ isAuthenticated: true });
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка регистрации:", error);
    }
  },

  addEployees: async (data: FormData) => {
    try {
      set({ error: null });
      await addEployeesData(data);
      set({ isAuthenticated: true });
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка, не удалось добавить сотрудника", error);
    }
  },

  login: async (data: LoginInputs): Promise<void> => {
    try {
      set({ error: null });
      const response = await postLoginData(data);
      if (response?.token) {
        localStorage.setItem("token", response.token);

        const userData = await getUserData();

        if (userData) {
          set({
            user: userData,
            isAuthenticated: true,
            error: null,
          });
        } else {
          set({ error: "Не удалось получить данные пользователя" });
        }
      } else {
        set({ error: "Ошибка авторизации" });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка авторизации:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false, error: null });
  },

  updateUser: async (id: string | number, userData: Partial<Usern>) => {
    try {
      const updatedUser = await updateUserData(id, userData);
      console.log(updatedUser);
      if (updatedUser) {
        set({ user: updatedUser, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Ошибка обновления данных пользователя:", error);
    }
  },
}));
