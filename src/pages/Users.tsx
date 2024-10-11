export const Users = () => {
  return (
    <div className="relative p-5">
      <div className="flex w-full h-full">
        <select className="border border-gray-300 rounded-md p-2 w-[40%] h-10 cursor-pointer">
          <option value="Все пользователи">Все пользователи</option>
          <option value="По дате регистрации (новые)">
            По дате регистрации (новые)
          </option>
          <option value="По дате регистрации (старые)се пользователи">
            По дате регистрации (старые)
          </option>
        </select>

        <div className="flex items-center w-full justify-end">
          <input
            type="text"
            className="border p-2 rounded-s-lg w-[80%] h-10"
            placeholder="Поиск по номеру задания/номеру телефона клиента"
          />
          <button className="bg-customBlue text-white p-2 rounded-e-lg w-[15%] h-10">
            Найти
          </button>
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-2" />
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-3">
          <input className=" cursor-pointer" type="checkbox" />
          <p className="opacity-35 cursor-pointer">
            Выбрать всех пользователей
          </p>
        </div>
        <button className="ml-auto text-customBlue">Удалить</button>
      </div>
    </div>
  );
};
