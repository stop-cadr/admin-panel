export const LogIn = () => {
  return (
    <div className="bg-[#1A1919] min-h-screen justify-center items-center flex flex-col gap-3">
      <form className="flex w-full justify-center items-center">
        <div className="flex flex-col gap-4 w-[30%] h-full">
          <input
            className="border bg-[#1A1919] rounded-md h-12  p-2 opacity-30 text-white pl-3"
            type="text"
            placeholder="Ваше имя"
          />
          <input
            className="border bg-[#1A1919] rounded-md h-12  p-2 opacity-30 text-white pl-3"
            type="text"
            placeholder="Ваш e-mail"
          />
          <input
            className="border bg-[#1A1919] rounded-md h-12 p-2 opacity-30 text-white pl-3"
            type="text"
            placeholder="Ваше телефон"
          />
          <input
            className="border bg-[#1A1919] rounded-md h-12 p-2 opacity-30 text-white pl-3"
            type="password"
            placeholder="Пароль"
          />
          <input
            className="border bg-[#1A1919] rounded-md h-12 p-2 opacity-30 text-white pl-3"
            type="password"
            placeholder="Пароль еще раз"
          />
          <button className="bg-amber-400  h-12 rounded-md text-white cursor-pointer">
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
};
