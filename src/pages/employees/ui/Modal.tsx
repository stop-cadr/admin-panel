import { useForm } from "react-hook-form";
import { FormData } from "../types/types";
import { useEffect } from "react";
import { useEmployeeStore } from "@/store/employeeStore";
import { Eye } from "lucide-react";

export const Modal = ({
  onClose,
  employee,
}: {
  onClose: () => void;
  employee: FormData | null;
}) => {
  const { addEmployee, updateEmployee, showPassword, toggleShowPassword } =
    useEmployeeStore();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (employee) {
      setValue("name", employee.name);
      setValue("phone", employee.phone);
      setValue("password", employee.password);
      setValue("date", employee.date);
      setValue("position", employee.position);
      setValue("comment", employee.comment);
    } else {
      reset();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [employee, reset, setValue]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const onSubmit = async (data: FormData) => {
    if (employee) {
      await updateEmployee(employee.id, data);
    } else {
      await addEmployee(data);
    }
    reset();
    onClose();
  };
  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
    >
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="p-5 text-xl opacity-50">
            {employee ? "Редактировать сотрудника" : "Добавить сотрудника"}
          </h2>

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
                className="w-full h-full py-2 px-2 text-base border-none "
                placeholder="Имя сотрудника"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <p className="text-red-600 text-[10px]">Введите имя!</p>
              )}
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex items-center gap-2 h-full ">
              <img src="./image/phone.png" className=" pl-5 " />
              <input
                type="text"
                className="w-full h-full py-2 px-2 text-base border-none "
                placeholder="+7"
                {...register("phone", {
                  required: "Введите номер телефона!",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Номер телефона должен содержать только цифры",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-600 text-[10px] flex-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <hr className="border-t w-full border-gray-300" />

            <div className="flex items-center gap-2 h-full ">
              <img src="./image/key.png" className="pl-5" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-full ml-1 py-2 px-2 text-base border-none "
                placeholder="Пароль"
                {...register("password", {
                  required: "Введите пароль!",
                  minLength: {
                    value: 6,
                    message: "Пароль должен быть не менее 6 символов!",
                  },
                })}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="flex items-center justify-center p-2"
              >
                <Eye className="opacity-65 " />
              </button>
              {errors?.password && (
                <p className="text-red-600 text-[10px] flex-1">
                  {errors.password.message}
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

            <div className="flex">
              <div className="flex items-center justify-between">
                <img src="./image/postion.png" className=" pl-5 " />
              </div>
              <div className="w-full px-3">
                <select
                  {...register("position", {
                    required: "Выберите должность!",
                  })}
                  className="border border-gray-400 rounded-md p-2 w-full"
                >
                  {errors.position && (
                    <p className="text-red-600 text-[8px] flex-1">
                      {errors.position.message}
                    </p>
                  )}
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
                className="w-full h-full py-5 px-12 border-none "
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
