import React, { useEffect } from "react";
import { Modal } from "./employees/ui/Modal";
import { List } from "./employees/ui/List";
import { useEmployeeStore } from "@/store/employeeStore";
import { useUIStore } from "@/store/uiStore";
import * as _ from "lodash";

export const Employees: React.FC = () => {
  const {
    getEmployees,
    employees,
    selectedEmployeeIds,
    toggleEmployeeSelection,
    selectAllEmployees,
    clearEmployeeSelection,
    deleteSelectedEmployees,
  } = useEmployeeStore();

  const {
    setPositionFilter,
    setTextFilter,
    positionFilter,
    textFilter,
    isModalOpen,
    openModal,
    closeModal,
    selectedEmployee
  } = useUIStore();

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const handleAddClick = () => {
    openModal(null);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPositionFilter(event.target.value);
  };

  const handleFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const debouncedSetTextFilter = _.debounce((value: string) => {
      setTextFilter(value);
    }, 300);
    debouncedSetTextFilter(value);
  };

  const handleSelectAll = () => {
    if (selectedEmployeeIds.length === employees.length) {
      clearEmployeeSelection();
    } else {
      selectAllEmployees();
    }
  };

  const handleDeleteClick = () => {
    deleteSelectedEmployees();
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      (positionFilter === "Все сотрудники" ||
        employee.position === positionFilter) &&
      (textFilter === "" ||
        employee.id.toString().includes(textFilter) ||
        employee.phone.includes(textFilter))
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
        {isModalOpen && (
          <Modal onClose={closeModal} employee={selectedEmployee} />
        )}
        <select
          className="border border-gray-300 rounded-md p-2 w-[40%] h-10"
          onChange={handleFilterChange}
          value={positionFilter}
        >
          <option value="Все сотрудники">Все сотрудники</option>
        </select>

        <div className="flex items-center w-full justify-end">
          <input
            type="text"
            className="border p-2 rounded-s-lg w-[80%] h-10"
            placeholder="Поиск по номеру ID/номеру телефона"
            onChange={handleFilterInput}
            value={textFilter}
          />
          <button className="bg-customBlue text-white p-2 rounded-e-lg w-[15%] h-10">
            Найти
          </button>
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-2" />
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-3">
          <input
            className="cursor-pointer"
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectedEmployeeIds.length === employees.length}
          />
          <p className="text-gray-400 cursor-pointer">
            Выбрать всех сотрудников
          </p>
        </div>
        <button
          className="ml-auto text-customBlue"
          onClick={handleDeleteClick}
          disabled={selectedEmployeeIds.length === 0}
        >
          Удалить
        </button>
      </div>
      <hr className="border-t border-gray-300" />
      <List
        employees={filteredEmployees}
        toggleEmployeeSelection={toggleEmployeeSelection}
        selectedEmployeeIds={selectedEmployeeIds}
      />
    </div>
  );
};
