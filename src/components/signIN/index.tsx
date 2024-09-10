export const SignInForm = () => {
  return (
    <div className="bg-[#1A1919] min-h-screen justify-center items-center flex flex-col gap-3">
      <div className="flex gap-28 items-center">
        <p className="text-white opacity-35">Войти</p>
        <button
          onClick={() => window.open("http://localhost:5173/Login")}
          className="border rounded-md p-[4px] px-2 opacity-20 text-white"
        >
          Регистрация
        </button>
      </div>
      <form className="flex flex-col gap-3 w-full justify-center items-center">
        <div className="relative w-[19%]">
          <input
            className="border bg-[#1A1919] rounded-md w-full h-11 p-2 opacity-30 text-white pl-12"
            type="text"
            placeholder="Введите имя"
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
        <div className=" relative w-[19%]">
          <input
            className="border bg-[#1A1919] rounded-md w-full  h-11 p-2 opacity-30 text-white pl-12 "
            type="password"
            placeholder="Введите пароль"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="absolute top-1/2 transform -translate-y-1/2 left-2 text-white opacity-50"
          >
            <circle cx="12" cy="16" r="1" />
            <rect x="3" y="10" width="18" height="12" rx="2" />
            <path d="M7 10V7a5 5 0 0 1 10 0v3" />
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
