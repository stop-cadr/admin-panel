export interface FormData {
  email: string;
  name: string;
  phone: string;
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
