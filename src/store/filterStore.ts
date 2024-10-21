import { create } from "zustand";
import { EmployeeFilterState, UserFilterStore } from "./types";

export const useEmployeeFilterStore = create<EmployeeFilterState>((set) => ({
  isModalOpen: false,
  selectedEmployee: null,
  positionFilter: "Все сотрудники",
  textFilter: "",
  filter: "",

  openModal: (employee) =>
    set({ isModalOpen: true, selectedEmployee: employee }),
  closeModal: () => set({ isModalOpen: false, selectedEmployee: null }),

  setPositionFilter: (filter) => set({ positionFilter: filter }),
  setTextFilter: (filter) => set({ textFilter: filter }),
  setFilter: (filter) => set({ filter }),
}));

export const useUserFilterStore = create<UserFilterStore>((set) => ({
  positionFilter: "Все пользователи",
  textFilter: "",
  setPositionFilter: (filter) => set({ positionFilter: filter }),
  setTextFilter: (filter) => set({ textFilter: filter }),
  isModalOpen: false,
  openModal: (user) => set({ isModalOpen: true, selectedUser: user }),
  closeModal: () => set({ isModalOpen: false, selectedUser: null }),
  selectedUser: null,
}));
