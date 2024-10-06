export const Employees = () => {
  return (
    <div>
      <div className="p-4">
        <div className="flex w-full h-full gap-5">
          <button className="flex gap-2 bg-customBlue px-7 py-3 text-white items-center rounded-3xl h-10 cursor-pointer">
            Добавить <img src="./image/plus.png" alt="plus" />
          </button>
          <select className="border border-gray-300 rounded-md p-2 w-[40%] h-10">
            <option value="Все пользователи">Все сотрудники</option>
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
              placeholder="Поиск по номеру ID/номеру телефона"
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
              Выбрать всех сотрудников
            </p>
          </div>
          <button className="ml-auto text-customBlue">Удалить</button>
        </div>
      </div>
    </div>
  );
};
