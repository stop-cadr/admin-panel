export interface RegisterInputs {
  email: string;
  name: string;
  number: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface Response {
  token: string;
  user?: {
    id: number;
    email: string;
    name: string;
    number: string;
  };
}

export interface Usern {
  id: number;
  email: string;
  name: string;
  number: string;
  password: string;
  status?: string;
  position?: string;
  date?: string;
  comment?: string;
}
