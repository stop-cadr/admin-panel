import { useForm } from "react-hook-form";
import { FormData } from "../types/types";
import { useAuthStore } from "@/store/store";
import { useEffect } from "react";

export const Modal = ({ onClose }: { onClose: () => void }) => {
  const addEmployees = useAuthStore((state) => state.addEployees);
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const onSubmit = async (data: FormData) => {
    try {
      await addEmployees(data);
    } catch (error) {
      console.error("Ошибка, не удалось добавить сотрудника", error);
    } finally {
      reset();
    }
  };
  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
    >
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="p-5 text-xl opacity-50">ID</h2>
        </div>
        <hr className="border-t w-full border-gray-300 mt-2" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" pt-4 flex flex-col gap-4 ">
            <div className="flex items-center justify-between w-full px-4">
              <div className="h-full bg-gray-200 rounded-md flex items-center justify-center w-[25%]">
                <img alt="Avatar" className="h-[102px] object-cover " />
              </div>
              <button className="bg-customBlue text-white py-2 px-4 rounded-md w-[70%]">
                Загрузить фото
              </button>
            </div>
            <hr className="border-t w-full border-gray-300 mt-2" />

            <div className="flex items-center gap-2 h-full ">
              <img src="./image/icon.png" className="pl-5" />
              <input
                type="text"
                {...register("name")}
                className="w-full h-full py-2 px-2 text-base border-none focus:outline-none"
                placeholder="Имя сотрудника"
              />
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex items-center gap-2 h-full ">
              <img src="./image/phone.png" className=" pl-5 " />
              <input
                type="text"
                {...register("phone")}
                className="w-full h-full py-2 px-2 text-base border-none focus:outline-none"
                placeholder="+7"
              />
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex items-center gap-2 h-full ">
              <img src="./image/key.png" className="pl-5" />
              <input
                type="password"
                {...register("password")}
                className="w-full h-full ml-1 py-2 px-2 text-base border-none focus:outline-none"
                placeholder="Пароль"
              />
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex items-center gap-2 h-full ">
              <img src="./image/date.png" className="pl-5" />
              <input
                type="text"
                {...register("date")}
                placeholder="Дата регистрации"
                className="w-full h-full py-2 px-2 text-base border-none focus:outline-none"
                maxLength={10}
              />
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex">
              <div className="flex items-center justify-between">
                <img src="./image/postion.png" className=" pl-5 " />
              </div>
              <div className="w-full px-3">
                <select
                  {...register("position")}
                  className="border border-gray-400 rounded-md p-2 w-full"
                >
                  <option value="" disabled>
                    Выберите должность
                  </option>
                  <option value="Все сотрудники">Все сотрудники</option>
                  <option value="Монтажер">Монтажер</option>
                  <option value="Администратор">Администратор</option>
                  <option value="Монтажер">Монтажер</option>
                  <option value="Камерамэн">Камерамэн</option>
                  <option value="Фотограф">Фотограф</option>
                  <option value="Лайтрум специалист">Лайтрум специалист</option>
                  <option value="СММ">СММ</option>
                  <option value="Сторонний сотрудник">
                    Сторонний сотрудник
                  </option>
                </select>
              </div>
            </div>
            <hr className="border-t w-full border-gray-300" />
            <div className="flex relative px-3 items-center">
              <img src="./image/pen.png" className="absolute pl-2 " />
              <input
                type="text"
                {...register("comment")}
                className="w-full h-full py-5 px-12 border-none focus:outline-none"
                placeholder="Комментарий"
              />
            </div>

            <div className="flex flex-col mt-4 px-5">
              <button
                type="submit"
                className="bg-customBlue text-white py-2 px-4 rounded-md"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-customBlue hover:text-red-700 p-5 "
              >
                Удалить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
