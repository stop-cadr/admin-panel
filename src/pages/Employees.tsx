import { useEffect, useState } from "react";
import { Modal } from "./employees/ui/Modal";
import { List } from "./employees/ui/List";
import { useAuthStore } from "@/store/store";

export const Employees: React.FC = () => {
  const { getEmployees, employees } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleClosedModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    filter === "" || filter === "Все сотрудники"
      ? true
      : employee.position === filter
  );

  return (
    <div className="p-4">
      <div className="flex w-full h-full gap-5">
        <button
          onClick={handleAddClick}
          className="flex gap-2 bg-customBlue px-7 py-3 text-white items-center rounded-3xl h-10 cursor-pointer"
        >
          Добавить <img src="./image/plus.png" alt="plus" />
        </button>
        {isModalOpen && <Modal onClose={handleClosedModal} />}
        <select
          className="border border-gray-300 rounded-md p-2 w-[40%] h-10"
          onChange={handleFilterChange}
          value={filter}
        >
          <option value="Все сотрудники">Все сотрудники</option>
          <option value="Монтажер">Монтажер</option>
          <option value="Администратор">Администратор</option>
          <option value="Камерамэн">Камерамэн</option>
          <option value="Фотограф">Фотограф</option>
          <option value="Лайтрум специалист">Лайтрум специалист</option>
          <option value="СММ">СММ</option>
          <option value="Сторонний сотрудник">Сторонний сотрудник</option>
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
          <input className="cursor-pointer" type="checkbox" />
          <p className="text-gray-400 cursor-pointer">
            Выбрать всех сотрудников
          </p>
        </div>
        <button className="ml-auto text-customBlue">Удалить</button>
      </div>
      <hr className="border-t border-gray-300" />
      <List employees={filteredEmployees} />
    </div>
  );
};
