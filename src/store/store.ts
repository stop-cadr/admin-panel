import { create } from "zustand";
import {
  getUserData,
  getEmployeesData,
  addEmployeesData,
  postRegisterData,
  postLoginData,
  updateUserData,
  updateEmployeesData,
  deleteEmployeeData,
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
  isModalOpen: boolean;
  selectedEmployee: FormData | null;
  selectedEmployeeIds: number[];
  toggleEmployeeSelection: (id: number) => void;
  selectAllEmployees: () => void;
  clearEmployeeSelection: () => void;
  deleteSelectedEmployees: () => Promise<void>;
  positionFilter: string;
  textFilter: string;
  filter: string;
  setPositionFilter: (filter: string) => void;
  setTextFilter: (filter: string) => void;
  setFilter: (filter: string) => void;
  getEmployees: () => Promise<void>;
  openModal: (employee: FormData | null) => void;
  closeModal: () => void;
  getMe: () => Promise<void>;
  register: (data: Omit<Usern, "id">) => Promise<void>;
  addEmployees: (data: FormData) => Promise<void>;
  login: (data: LoginInputs) => Promise<void>;
  logout: () => void;
  updateUser: (id: string | number, userData: Partial<Usern>) => Promise<void>;
  updateEmployees: (id: string | number, formData: FormData) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: Boolean(localStorage.getItem("token")),
  error: null,
  isLoading: false,
  employees: [],
  status: false,
  isModalOpen: false,
  selectedEmployee: null,
  selectedEmployeeIds: [],
  positionFilter: "Все сотрудники",
  textFilter: "",
  filter: "",

  setPositionFilter: (filter) => set({ positionFilter: filter }),
  setTextFilter: (filter) => set({ textFilter: filter }),
  setFilter: (filter) => set({ filter }),

  getMe: async () => {
    set({ isLoading: true, error: null });
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

  register: async (data: Omit<Usern, "id">) => {
    set({ error: null, isLoading: true });
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

  addEmployees: async (data: FormData) => {
    set({ error: null, isLoading: true });
    try {
      await addEmployeesData(data);
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка, не удалось добавить сотрудника", error);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data: LoginInputs) => {
    set({ error: null, isLoading: true });
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

  updateUser: async (id: string | number, userData: Partial<Usern>) => {
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

  updateEmployees: async (id: string | number, formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEmployee = await updateEmployeesData(id, formData);
      if (updatedEmployee) {
        set((state) => ({
          employees: state.employees.map((employee) =>
            employee.id === id ? updatedEmployee : employee
          ),
        }));
      }
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка обновления данных сотрудников:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getEmployees: async () => {
    set({ isLoading: true, error: null, status: false });
    try {
      const employeeData = await getEmployeesData();
      if (employeeData) {
        set({ employees: employeeData, status: true });
      } else {
        set({ error: "Не удалось получить данные сотрудников" });
      }
    } catch (error) {
      console.error("Ошибка при получении данных сотрудников:", error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  openModal: (employee) =>
    set({ isModalOpen: true, selectedEmployee: employee }),
  closeModal: () => set({ isModalOpen: false, selectedEmployee: null }),

  toggleEmployeeSelection: (id) =>
    set((state) => ({
      selectedEmployeeIds: state.selectedEmployeeIds.includes(id)
        ? state.selectedEmployeeIds.filter((employeeId) => employeeId !== id)
        : [...state.selectedEmployeeIds, id],
    })),

  selectAllEmployees: () =>
    set((state) => ({
      selectedEmployeeIds:
        state.selectedEmployeeIds.length === state.employees.length
          ? []
          : state.employees.map((employee) => employee.id),
    })),

  clearEmployeeSelection: () => set({ selectedEmployeeIds: [] }),

  deleteSelectedEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      const selectedIds = useAuthStore.getState().selectedEmployeeIds;
      const deletePromises = selectedIds.map((id) => deleteEmployeeData(id));
      const results = await Promise.all(deletePromises);

      set((state) => ({
        employees: state.employees.filter(
          (employee) => !selectedIds.includes(employee.id)
        ),
        selectedEmployeeIds: [],
      }));

      if (results.some((result) => !result)) {
        set({ error: "Некоторые сотрудники не были удалены." });
      }
    } catch (error) {
      console.error("Ошибка при удалении сотрудников:", error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
