import { Usern } from "@/store/types";
import axios from "axios";

export const getUsersData = async (): Promise<Usern[] | null> => {
  try {
    const response = await axios.get<Usern[]>(
      "https://b846882921d4f43c.mokky.dev/users"
    );
    return response.data; // Ожидаем, что сервер вернет массив пользователей
  } catch (error) {
    console.error("Ошибка при получении данных пользователей:", error);
    return null;
  }
};

// Удаление пользователя
export const deleteUserData = async (id: string | number): Promise<boolean> => {
  try {
    const response = await axios.delete(
      `https://b846882921d4f43c.mokky.dev/users/${id}`
    );
    return response.status === 204; // Успешное удаление
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    return false;
  }
};

// Изменение данных пользователя
export const updateUserData = async (
  id: string | number,
  userData: Partial<Usern>
): Promise<Usern | null> => {
  try {
    const response = await axios.patch<Usern>(
      `https://b846882921d4f43c.mokky.dev/users/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Не удалось изменить данные пользователя:", error);
    return null;
  }
};

// Остальные функции остаются без изменений
