import { create } from "zustand";
import {
  getEmployeesData,
  addEmployeesData,
  updateEmployeesData,
  deleteEmployeeData,
} from "./services";
import { EmployeeState } from "./types/storeTypes";

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  isLoading: true,
  error: null,
  selectedEmployeeIds: [],
  showPassword: false,
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),

  getEmployees: async () => {
    set({ isLoading: true });
    try {
      const employeeData = await getEmployeesData();
      set({ employees: employeeData });
    } catch (error) {
      console.error("Ошибка при получении данных сотрудников:", error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addEmployee: async (data) => {
    set({ isLoading: true });
    try {
      await addEmployeesData(data);
      set((state) => ({ employees: [...state.employees, data] }));
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка, не удалось добавить сотрудника", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateEmployee: async (id, formData) => {
    set({ isLoading: true });
    try {
      const updatedEmployee = await updateEmployeesData(id, formData);
      set((state) => ({
        employees: state.employees.map((employee) =>
          employee.id === id ? updatedEmployee : employee
        ),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка обновления данных сотрудников:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSelectedEmployees: async () => {
    set({ isLoading: true });
    try {
      const selectedIds = useEmployeeStore.getState().selectedEmployeeIds;
      const deletePromises = selectedIds.map((id) => deleteEmployeeData(id));
      await Promise.all(deletePromises);

      set((state) => ({
        employees: state.employees.filter(
          (employee) => !selectedIds.includes(employee.id)
        ),
        selectedEmployeeIds: [],
      }));
    } catch (error) {
      console.error("Ошибка при удалении сотрудников:", error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

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
}));
