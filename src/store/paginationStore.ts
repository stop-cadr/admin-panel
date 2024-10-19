import { create } from "zustand";

interface PaginationState {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  totalPages: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
}));
