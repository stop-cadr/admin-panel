import { SubmitHandler, useForm } from "react-hook-form";
import { fetchRegisterData } from "@/services";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";

interface InputsUp {
  email: string;
  name: string;
  number: number;
  password: string;
  confirmPassword: string;
}

export const SignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputsUp>({ mode: "onBlur" });

  const password = watch("password");

  const onSubmit: SubmitHandler<InputsUp> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    try {
      await fetchRegisterData(data);
      setUser({ email: data.email, name: data.name, password: data.password });
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <div className="bg-[#1A1919] min-h-screen justify-center items-center flex flex-col gap-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full justify-center items-center"
      >
        <div className="flex flex-col gap-6 w-[600px] p-3 h-full">
          <button
            onClick={() => navigate("/sign-in")}
            className="flex justify-start text-white opacity-55"
          >
            Назад
          </button>
          <div className="w-full">
            <input
              className=" w-full border bg-[#1A1919] rounded-md h-12  p-2 opacity-30 text-white pl-3"
              type="text"
              placeholder="Ваше имя"
              {...register("name", {
                required: true,
              })}
            />
            {errors?.name && (
              <p className="text-red-600 text-[13px]">Введите имя!</p>
            )}
          </div>

          <div className="w-full">
            <input
              className="w-full border bg-[#1A1919] rounded-md h-12  p-2 opacity-30 text-white pl-3"
              type="email"
              placeholder="Ваш e-mail"
              {...register("email", {
                required: true,
              })}
            />
            {errors?.email && (
              <p className="text-red-600 text-[13px]">Введите email!</p>
            )}
          </div>

          <div className="w-full">
            <input
              className="w-full border bg-[#1A1919] rounded-md h-12 p-2 opacity-30 text-white pl-3"
              placeholder="Ваш телефон"
              {...register("number", {
                required: "Введите номер телефона!",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Номер телефона должен содержать только цифры",
                },
              })}
            />
            {errors?.number && (
              <p className="text-red-600 text-[13px]">
                {errors.number.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              className=" w-full border bg-[#1A1919] rounded-md h-12 p-2 opacity-30 text-white pl-3"
              type="password"
              placeholder="Пароль"
              {...register("password", {
                required: "Введите пароль!",
                minLength: {
                  value: 6,
                  message: "Пароль должен быть не менее 6 символов!",
                },
              })}
            />
            {errors?.password && (
              <p className="text-red-600 text-[13px]">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              className="w-full border bg-[#1A1919] rounded-md h-12 p-2 opacity-30 text-white pl-3"
              type="password"
              placeholder="Пароль еще раз"
              {...register("confirmPassword", {
                required: "Введите пароль еще раз!",
                minLength: {
                  value: 6,
                  message: "Пароль должен быть не менее 6 символов!",
                },
                validate: (value) =>
                  value === password || "Пароли не совпадают",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-[13px]">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button className="bg-amber-400  h-12 rounded-md text-white cursor-pointer">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};
