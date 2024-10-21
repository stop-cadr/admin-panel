import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { UserModalProps } from "../types/types";
import { Usern } from "@/store/types";

export const UserModal: React.FC<UserModalProps> = ({ onClose, user }) => {
  const { updateUser } = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Usern>();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (user) {
      setValue("name", user.name);
      setValue("number", user.number);
      setValue("position", user.date);
      setValue("status", user.status);
      setValue("comment", user.comment);
    } else {
      reset();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [user, reset, setValue]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const onSubmit = async (data: Usern) => {
    if (user) {
      await updateUser(user.id, data);
    }
    reset();
    onClose();
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="p-5 text-xl opacity-80">
            {" "}
            id: {user ? user.id : "Неизвестный пользователь"}
          </h2>
        </div>
        <hr className="border-t w-full border-gray-300 mt-2" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 h-full ">
              <img src="./image/icon.png" className="pl-5" />
              <input
                type="text"
                className="w-full h-full py-2 px-2 text-base border-none"
                placeholder="Имя пользователя"
                {...register("name", {
                  required: "Введите имя пользователя!",
                })}
              />
              {errors.name && (
                <p className="text-red-600 text-[10px]">
                  {errors.name.message}
                </p>
              )}
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex items-center gap-2 h-full ">
              <img src="./image/phone.png" className=" pl-5 " />

              <input
                type="text"
                className="w-full h-full py-2 px-2 text-base border-none"
                placeholder="Номер телефона"
                {...register("number", {
                  required: "Введите номер телефона!",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Номер телефона должен содержать только цифры",
                  },
                })}
              />
              {errors.number && (
                <p className="text-red-600 text-[10px]">
                  {errors.number.message}
                </p>
              )}
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex items-center gap-2 h-full ">
              <img src="./image/date.png" className="pl-5" />
              <input
                type="text"
                placeholder="Дата регистрации"
                className="w-full h-full py-2 px-2 text-base border-none "
                maxLength={10}
                {...register("date", {
                  required: "Введите дату!",
                })}
              />
              {errors?.date && (
                <p className="text-red-600 text-[10px] flex-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex items-center gap-3 h-full">
              <img src="./image/postion.png" className="pl-5 " />
              <input
                type={user ? "Онлайн" : "Оффлайн"}
                {...register("status")}
                className="w-full h-full py-2 px-2 text-base border-none "
                placeholder="Статус"
              />
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex relative px-3 items-center pb-24">
              <img src="./image/pen.png" className="absolute pl-2 " />
              <input
                type="text"
                {...register("comment")}
                className="w-full h-full py-5 px-10 border-none "
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
                className="text-customBlue hover:text-red-700 p-5"
              >
                Отмена
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
