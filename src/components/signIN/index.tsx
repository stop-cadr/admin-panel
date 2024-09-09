export const SignInForm = () => {
  return (
    <div className="bg-[#1A1919] min-h-screen justify-center items-center flex flex-col gap-3">
      <div className="flex gap-28 items-center">
        <p className="text-white opacity-35">Войти</p>
        <button className="border rounded-md p-[3px] opacity-20 text-white">
          Регистрация
        </button>
      </div>
      <form className="flex flex-col gap-3">
        <input
          className="border bg-[#1A1919] rounded-md px-11 py-2 opacity-30 text-white  "
          type="text"
          placeholder="Введите имя"
        />
        <input
          className="border bg-[#1A1919] rounded-md px-11 py-2 opacity-30 text-white "
          type="password"
          placeholder=""
        />
        <button className="bg-amber-400 px-11 py-2  rounded-md text-white cursor-pointer">
          Войти
        </button>
      </form>
    </div>
  );
};
