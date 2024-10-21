import { LoginInputs, Usern, Response } from "@/store/types";
import axios from "axios";
import { FormData } from "@/pages/employees/types/types";

export const postRegisterData = async (
  data: Omit<Usern, "id">
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

export const addEmployeesData = async (data: FormData) => {
  try {
    const response = await axios.post<FormData>(
      "https://b846882921d4f43c.mokky.dev/emmployees",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка, не удалось добавить сотрудника", error);

    return null;
  }
};
export const deleteEmployeeData = async (
  id: string | number
): Promise<boolean> => {
  try {
    const response = await axios.delete(
      `https://b846882921d4f43c.mokky.dev/emmployees/${id}`
    );
    return response.status === 204;
  } catch (error) {
    console.error("Ошибка при удалении сотрудника:", error);
    return false;
  }
};

export const getEmployeesData = async () => {
  try {
    const response = await axios.get(
      "https://b846882921d4f43c.mokky.dev/emmployees"
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных сотрудника", error);
    return null;
  }
};

export const updateEmployeesData = async (
  id: string | number,
  data: FormData
) => {
  try {
    const response = await axios.patch(
      `https://b846882921d4f43c.mokky.dev/emmployees/${id}`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Не удалось изменить данные", error);
    return null;
  }
};

export const updateUserData = async (
  id: string | number,
  userData: Partial<Usern>
): Promise<Usern | null> => {
  try {
    const response = await axios.patch(
      `https://b846882921d4f43c.mokky.dev/users/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Не удалось изменить данные", error);
    return null;
  }
};

export const getUserData = async (): Promise<Usern | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Токен не найден. Нужно авторизоваться");
    }
    const response = await axios.get<Usern>(
      "https://b846882921d4f43c.mokky.dev/auth_me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      "https://b846882921d4f43c.mokky.dev/users"
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя", error);
    return null;
  }
};

export const deleteUserData = async (id: string | number): Promise<boolean> => {
  try {
    const response = await axios.delete(
      `https://b846882921d4f43c.mokky.dev/users/${id}`
    );
    return response.status === 204;
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    return false;
  }
};

export const deleteAllUsersData = async (): Promise<boolean> => {
  try {
    const response = await axios.delete(
      "https://b846882921d4f43c.mokky.dev/users"
    );
    return response.status === 204;
  } catch (error) {
    console.error("Ошибка при удалении всех пользователей:", error);
    return false;
  }
};
