import axios from "axios";

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
}

export interface User {
  id: string;
  email: string;
  name: string;
  number: string;
  password: string;
  confirmPassword: string;
}
export const postRegisterData = async (
  data: RegisterInputs
): Promise<Response> => {
  try {
    const response = await axios.post<Response>(
      "https://b846882921d4f43c.mokky.dev/register",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw new Error("Не удалось зарегистрироваться");
  }
};

export const postLoginData = async (
  data: LoginInputs
): Promise<Response | null> => {
  try {
    const response = await axios.post<Response>(
      "https://b846882921d4f43c.mokky.dev/auth",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    return null;
  }
};

export const getUserData = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Токен не найден. Нужно авторизоваться");
    }
    const response = await axios.get<User>(
      "https://b846882921d4f43c.mokky.dev/users"
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return null;
  }
};
