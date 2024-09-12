import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const fetchData = async (data: Inputs) => {
    const res = await fetch("https://b846882921d4f43c.mokky.dev/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "ошибка авторизации");
    }
    localStorage.setItem("token", responseData.token);
    console.log("Авторизация успешна", responseData);
  };

  const { handleSubmit, register, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.password) {
      return;
    }
    try {
      await fetchData(data);
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  return (
    <div className="bg-[#1A1919] min-h-screen justify-center items-center flex flex-col gap-3">
      <div className="flex gap-28 items-center">
        <p className="text-white opacity-35">Войти</p>
        <button
          type="button"
          onClick={() => window.open("http://localhost:5173/Login")}
          className="border rounded-md p-[4px] px-2 opacity-20 text-white"
        >
          Регистрация
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full justify-center items-center"
      >
        <div className="relative w-[19%]">
          <input
            className="border bg-[#1A1919] rounded-md w-full h-11 p-2 opacity-30 text-white pl-12"
            type="email"
            placeholder="Введите email"
            {...register("email", { required: true })}
          />

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
        <div className="relative w-[19%]">
          <input
            className="border bg-[#1A1919] rounded-md w-full  h-11 p-2 opacity-30 text-white pl-12"
            type="password"
            placeholder="Введите пароль!"
            {...register("password", {
              required: "Введите пароль!",
            })}
          />

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

        <button className="bg-amber-400 w-[19%] h-11 rounded-md text-white cursor-pointer">
          Войти
        </button>
        <div className="flex gap-10">
          <p className=" text-sm text-gray-600 mt-2 float-left py-1 ml-2">
            Сохранить пароль
          </p>
          <p className="text-sm text-gray-600 mt-2 float-right py-1 cursor-pointer">
            Забыли пароль?
          </p>
        </div>
      </form>
    </div>
  );
};
