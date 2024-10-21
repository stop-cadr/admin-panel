import { create } from "zustand";
import { PaginationState } from "./types";

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  totalPages: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
}));
