export interface FormData {
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
}
