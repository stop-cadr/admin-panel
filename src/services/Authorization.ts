import { useAuthStore } from "@/store";
import axios from "axios";

interface RegisterInputs {
  email: string;
  name: string;
  number: number;
  password: string;
  confirmPassword: string;
}
interface LoginInputs {
  email: string;
  password: string;
}

export interface Response {
  token: string;
}

export const fetchRegisterData = async (data: RegisterInputs) => {
  try {
    const response = await axios.post<RegisterInputs, Response>(
      "https://b846882921d4f43c.mokky.dev/register",
      data
    );
    localStorage.setItem("token", response.token);
    const setUser = useAuthStore.getState().setUser;
    setUser({ email: data.email, password: data.password });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw new Error("Не удалось зарегистрироваться");
  }
};

export const fetchLoginData = async (data: LoginInputs) => {
  try {
    const response = await axios.post<Response>(
      "https://b846882921d4f43c.mokky.dev/auth",
      data
    );
    localStorage.setItem("token", response.data.token);
    const setUser = useAuthStore.getState().setUser;
    setUser({ email: data.email, password: data.password });
    const user = {
      email: data.email,
      password: data.password,
    };

    return user;
  } catch (error) {
    console.error("Ошибка авторизации", error);
    return null;
  }
};
