import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  name: string;
  number: number;
  password: number | string;
}

export const LogIn = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="bg-[#1A1919] min-h-screen justify-center items-center flex flex-col gap-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full justify-center items-center"
      >
        <div className="flex flex-col gap-4 w-[30%] h-full">
          <button
            onClick={() => window.open("http://localhost:5173/x")}
            className="flex justify-start text-white opacity-55"
          >
            Назад
          </button>
          <input
            className="border bg-[#1A1919] rounded-md h-12  p-2 opacity-30 text-white pl-3"
            type="text"
            placeholder="Ваше имя"
            {...register("name", {
              required: true,
            })}
          />

          {errors?.name && (
            <p className="text-red-600 text-[13px]">Введите имя!</p>
          )}
          <input
            className="border bg-[#1A1919] rounded-md h-12  p-2 opacity-30 text-white pl-3"
            type="email"
            placeholder="Ваш e-mail"
            {...register("email", {
              required: true,
            })}
          />
          {errors?.email && (
            <p className="text-red-600 text-[13px]">Введите email!</p>
          )}
          <input
            className="border bg-[#1A1919] rounded-md h-12 p-2 opacity-30 text-white pl-3"
            type="number"
            placeholder="Ваш телефон"
            {...register("number", {
              required: true,
            })}
          />
          {errors?.number && (
            <p className="text-red-600 text-[13px]">Введите номер!</p>
          )}
          <input
            className="border bg-[#1A1919] rounded-md h-12 p-2 opacity-30 text-white pl-3"
            type="password"
            placeholder="Пароль"
            {...register("password", {
              required: true,
            })}
          />
          {errors?.password && (
            <p className="text-red-600 text-[13px]">Введите пароль!</p>
          )}
          <input
            className="border bg-[#1A1919] rounded-md h-12 p-2 opacity-30 text-white pl-3"
            type="password"
            placeholder="Пароль еще раз"
            {...register("password", {
              required: true,
            })}
          />
          {errors?.password && (
            <p className="text-red-600 text-[13px]">Введите пароль!</p>
          )}
          <button className="bg-amber-400  h-12 rounded-md text-white cursor-pointer">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};
