import { Usern } from "@/store/types";

export interface UserModalProps {
  onClose: () => void;
  user: Usern | null;
  toggleUserSelection: (id: number) => void;
  selectedUserIds: number[];
}
export interface ListProps {
  users: Usern[];
  toggleUserSelection: (id: number) => void;
  selectedUserIds: number[];
}

export interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalUsers: number;
}
