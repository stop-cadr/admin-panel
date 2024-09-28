import axios from "axios";

export interface RegisterInputs {
  email: string;
  name: string;
  number: number;
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
