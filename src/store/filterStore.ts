import { create } from "zustand";
import type { FormData } from "@/pages/employees/types/types";

interface FilterState {
  isModalOpen: boolean;
  selectedEmployee: FormData | null;
  positionFilter: string;
  textFilter: string;
  filter: string;
  openModal: (employee: FormData | null) => void;
  closeModal: () => void;
  setPositionFilter: (filter: string) => void;
  setTextFilter: (filter: string) => void;
  setFilter: (filter: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
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
