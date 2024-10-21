export interface FormData {
  name: string;
  phone: string | string;
  password: string;
  date: string;
  position: string;
  comment: string;
  status: boolean;
  id: number;
}
export interface ListProps {
  employees: FormData[];
  toggleEmployeeSelection: (id: number) => void;
  selectedEmployeeIds: number[];
}
export interface ModalProps {
  onClose: () => void;
}


export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalEmployees: number;
  }