export const Orders = () => {
  return (
    <div className="bg-white  top-0 right-0 left-[250px] h-full  rounded-3xl">
      <section className="p-4">
        <div className="flex justify-between">
          <button className="flex gap-2 bg-customBlue px-5 py-3 text-white items-center rounded-3xl">
            Добавить <img src="./image/plus.png" alt="plus" />
          </button>
          <button className="flex gap-2 px-5 py-3 text-black items-center border rounded-3xl">
            Календарь <img src="./image/Calendar.png" />
          </button>
          <div className="flex items-center justify-between border rounded-lg px-4 py-2 w-60">
            <p>Все заказы</p>
            <img
              className="cursor-pointer"
              src="./image/Polygon 5.png"
              alt="arrow"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="border rounded-full">
              <img src="./image/Arrow left.png" alt="left" />
            </button>
            <p>03 июля 2024, четверг</p>
            <button className="border rounded-full">
              <img src="./image/Arrow right.png" alt="" />
            </button>
          </div>
          <div className="flex border rounded-3xl gap-4 px-5">
            <button className="opacity-35">Месяц</button>
            <button className="border px-4 opacity-35">Неделя</button>
            <button>День</button>
          </div>
        </div>
      </section>
      <hr className=" mb-3 border-t border-gray-300" />

      <div className="flex items-center px-6 gap-5">
        <select className=" cursor-pointer border rounded-md px-5 py-2">
          <option value="Событие">Событие</option>
          <option value="Свадьба">Свадьба</option>
          <option value="День рождение">День рождение</option>
          <option value="Романтический вечер">Романтический вечер</option>
          <option value="Другое">Другое</option>
        </select>
        <select className=" cursor-pointer border rounded-md px-5 py-2">
          <option value="1-4 класс">1-4 класс</option>
          <option value="Группа в детском саду">Группа в детском саду</option>
          <option value="10-11 класс">10-11 класс</option>
        </select>
        <select className=" cursor-pointer border rounded-md  py-2">
          <option value="Аренда">Аренда</option>
          <option value="Аренда студии">Аренда студии</option>
          <option value="Аренда студии + фотограф">
            Аренда Аренда студии + фотограф
          </option>
        </select>
      </div>
      <div className="mt-3">
        <hr className="border-t border-gray-300" />
        <div className="flex  p-2 w-full">
          <div className=" flex gap-6 items-center px-5 h-full">
            <p>Сортировать</p>
            <div className="flex items-center justify-around border rounded-md p-2 h-10">
              <select className="cursor-pointer ">
                <option value=" По дате добавления заявки">
                  {" "}
                  По дате добавления заявки
                </option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <input
              type="text"
              className="border p-2 rounded-s-lg w-[80%]"
              placeholder="Поиск по номеру задания/номеру телефона клиента"
            />
            <button className="bg-customBlue text-white p-2 rounded-e-lg w-[15%]">
              Найти
            </button>
          </div>
        </div>
        <hr className="border-t border-gray-300" />
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="flex gap-3">
          <input className=" cursor-pointer" type="checkbox" />
          <p className="opacity-35 cursor-pointer">Выбрать все заказы</p>
        </div>
        <button className="ml-auto text-customBlue">Удалить</button>
      </div>
    </div>
  );
};
