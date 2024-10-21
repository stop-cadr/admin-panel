import { create } from "zustand";
import {
  getAllUsers,
  updateUserData,
  deleteUserData,
  deleteAllUsersData,
} from "./services";
import { Usern, UserState } from "./types";
import dayjs from "dayjs";

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  filteredUsers: [],
  isLoading: false,
  error: null,
  filterStatus: "Все",
  selectedUserIds: [],

  getUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const usersData = await getAllUsers();
      if (Array.isArray(usersData)) {
        set({ users: usersData, filteredUsers: usersData, isLoading: false });
      } else {
        set({ users: [], filteredUsers: [], isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateUser: async (id: string | number, userData: Partial<Usern>) => {
    set({ isLoading: true });
    try {
      const updatedUser = await updateUserData(id, userData);
      if (updatedUser) {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? updatedUser : user
          ),
          filteredUsers: state.filteredUsers.map((user) =>
            user.id === id ? updatedUser : user
          ),
        }));
      }
    } catch (error) {
      console.error("Ошибка обновления данных пользователя:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (id: string | number) => {
    set({ isLoading: true });
    const success = await deleteUserData(id);
    if (success) {
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        filteredUsers: state.filteredUsers.filter((user) => user.id !== id),
      }));
    }
    set({ isLoading: false });
  },

  deleteAllUsers: async () => {
    set({ isLoading: true });
    const success = await deleteAllUsersData();
    if (success) {
      set({ users: [], filteredUsers: [] });
    }
    set({ isLoading: false });
  },

  setFilterStatus: (status: string) => {
    set((state) => {
      let filteredUsers: Usern[];

      const thirtyDaysAgo = dayjs().subtract(30, "days");

      if (status === "Новые пользователи") {
        filteredUsers = state.users.filter((user) =>
          dayjs(user.date).isAfter(thirtyDaysAgo)
        );
      } else if (status === "Старые пользователи") {
        filteredUsers = state.users.filter((user) =>
          dayjs(user.date).isBefore(thirtyDaysAgo)
        );
      } else {
        filteredUsers = state.users;
      }

      return { filterStatus: status, filteredUsers };
    });
  },

  toggleUserSelection: (id: number) => {
    set((state) => {
      const isSelected = state.selectedUserIds.includes(id);
      return {
        selectedUserIds: isSelected
          ? state.selectedUserIds.filter((userId) => userId !== id)
          : [...state.selectedUserIds, id],
      };
    });
  },

  selectAllUsers: () => {
    set((state) => ({
      selectedUserIds: state.users.map((user) => user.id),
    }));
  },

  clearUserSelection: () => {
    set({ selectedUserIds: [] });
  },

  deleteSelectedUsers: async () => {
    set({ isLoading: true });
    try {
      const promises = get().selectedUserIds.map((id) => deleteUserData(id));
      await Promise.all(promises);
      set((state) => ({
        users: state.users.filter(
          (user) => !state.selectedUserIds.includes(user.id)
        ),
        filteredUsers: state.filteredUsers.filter(
          (user) => !state.selectedUserIds.includes(user.id)
        ),
        selectedUserIds: [],
      }));
    } catch (error) {
      console.error("Ошибка удаления выбранных пользователей:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
