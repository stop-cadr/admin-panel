import { FormData } from "@/pages/employees/index";
import type { LoginInputs, Usern } from "./authTypes";

export interface EmployeeState {
  employees: FormData[];
  isLoading: boolean;
  error: string | null;
  selectedEmployeeIds: number[];
  getEmployees: () => Promise<void>;
  addEmployee: (data: FormData) => Promise<void>;
  updateEmployee: (id: string | number, formData: FormData) => Promise<void>;
  deleteSelectedEmployees: () => Promise<void>;
  toggleEmployeeSelection: (id: number) => void;
  selectAllEmployees: () => void;
  clearEmployeeSelection: () => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
}

export interface AuthState {
  user: Usern | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  getMe: () => Promise<void>;
  register: (data: Omit<Usern, "id">) => Promise<void>;
  login: (data: LoginInputs) => Promise<void>;
  logout: () => void;
  updateUser: (id: string | number, userData: Partial<Usern>) => Promise<void>;
}

export interface EmployeeFilterState {
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

export interface UserFilterStore {
  positionFilter: string;
  textFilter: string;
  setPositionFilter: (filter: string) => void;
  setTextFilter: (filter: string) => void;
  isModalOpen: boolean;
  openModal: (user: Usern | null) => void;
  closeModal: () => void;
  selectedUser: Usern | null;
}
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
}

export interface UserState {
  users: Usern[];
  filteredUsers: Usern[];
  isLoading: boolean;
  error: string | null;
  filterStatus: string;
  selectedUserIds: number[];
  getUsers: () => Promise<void>;
  updateUser: (id: string | number, userData: Partial<Usern>) => Promise<void>;
  deleteUser: (id: string | number) => Promise<void>;
  deleteAllUsers: () => Promise<void>;
  setFilterStatus: (status: string) => void;
  toggleUserSelection: (id: number) => void;
  selectAllUsers: () => void;
  clearUserSelection: () => void;
  deleteSelectedUsers: () => Promise<void>;
}
