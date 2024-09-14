import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

export interface Response {
  token: string;
}

export const SignIn = () => {
  const fetchData = async (data: Inputs) => {
    await axios
      .post<Response>("https://b846882921d4f43c.mokky.dev/auth", data)
      .then((response) => localStorage.setItem("token", response.data.token));
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.password) {
      console.error("Неверный пароль!");
    }
    try {
      await fetchData(data);

      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  return (
    <div className="bg-[#1A1919]  min-h-screen justify-center items-center flex flex-col gap-3">
      <div className="flex gap-28 items-center">
        <p className="text-white opacity-35">Войти</p>
        <button
          type="button"
          onClick={() => window.open("/sign-up")}
          className="border rounded-md p-[4px] px-2 opacity-20 text-white"
        >
          Регистрация
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3  justify-center items-center w-[280px]"
      >
        <div className="relative w-full ">
          <input
            className="border bg-[#1A1919] rounded-md w-full h-11 p-2 opacity-30 text-white pl-12"
            type="email"
            placeholder="Введите email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 transform -translate-y-1/2 left-2 text-white opacity-50"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <div className="absolute left-9 top-1/2 transform -translate-y-1/2 h-8 border-l border-gray-400 opacity-50"></div>
        </div>
        <div className="relative w-full">
          <input
            className="border bg-[#1A1919] rounded-md w-full  h-11 p-2 opacity-30 text-white pl-12"
            type="password"
            placeholder="Введите пароль!"
            {...register("password", {
              required: "Введите пароль!",
              minLength: {
                value: 6,
                message: "Пароль должен быть не менее 6 символов!",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 transform -translate-y-1/2 left-2 text-white opacity-50"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <div className="absolute left-9 top-1/2 transform -translate-y-1/2 h-8 border-l border-gray-400 opacity-50"></div>
        </div>

        <button className="bg-amber-400 w-[280px]  h-11 rounded-md text-white cursor-pointer">
          Войти
        </button>
        <div className="flex gap-8">
          <p className=" text-sm text-gray-600  float-left py-1 ">
            Сохранить пароль
          </p>
          <p className="text-sm text-gray-600  float-right py-1 cursor-pointer">
            Забыли пароль?
          </p>
        </div>
      </form>
    </div>
  );
};
