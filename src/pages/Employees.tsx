// src/pages/employees/Employees.tsx
import React, { useEffect, useMemo } from "react";
import { Modal } from "@/pages/employees/ui/Modal";
import { EmployeesList } from "@/pages/employees/ui/List";
import { Pagination } from "@/pages/employees/ui/Pagination";
import { useEmployeeStore } from "@/store/employeeStore";
import { useEmployeeFilterStore } from "@/store/filterStore";
import * as _ from "lodash";
import { usePaginationStore } from "@/store/paginationStore";

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
    selectedEmployee,
  } = useEmployeeFilterStore();

  const { currentPage, setCurrentPage } = usePaginationStore();

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const handleAddClick = () => openModal(null);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPositionFilter(event.target.value);
    setCurrentPage(1);
  };

  const debouncedSetTextFilter = useMemo(
    () => _.debounce((value: string) => setTextFilter(value), 300),
    [setTextFilter]
  );

  const handleFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetTextFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    if (selectedEmployeeIds.length === employees.length) {
      clearEmployeeSelection();
    } else {
      selectAllEmployees();
    }
  };

  const handleDeleteClick = () => deleteSelectedEmployees();

  const filteredEmployees = useMemo(
    () =>
      employees.filter(
        (employee) =>
          (positionFilter === "Все сотрудники" ||
            employee.position === positionFilter) &&
          (textFilter === "" ||
            employee.id.toString().includes(textFilter) ||
            employee.phone.includes(textFilter))
      ),
    [employees, positionFilter, textFilter]
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = useMemo(
    () =>
      filteredEmployees.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredEmployees, currentPage, itemsPerPage]
  );

  return (
    <div className="">
      <div className="flex w-full gap-5 mb-4 pt-4 px-4">
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
            onChange={handleFilterInput}
            value={textFilter}
          />
          <button className="bg-customBlue text-white p-2 rounded-e-lg w-[15%] h-10">
            Найти
          </button>
        </div>
      </div>
      <hr className="border-t border-gray-300" />

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
      <EmployeesList
        employees={paginatedEmployees}
        toggleEmployeeSelection={toggleEmployeeSelection}
        selectedEmployeeIds={selectedEmployeeIds}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalEmployees={filteredEmployees.length}
      />
    </div>
  );
};
