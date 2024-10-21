import React, { useEffect, useMemo } from "react";
import { UsersList } from "@/pages/users/ui/List";
import { useUserStore } from "@/store/userStore";
import { useUserFilterStore } from "@/store/filterStore";
import * as _ from "lodash";
import { usePaginationStore } from "@/store/paginationStore";
import { UserModal } from "./users/ui/Modal";
import { UserPagination } from "./users/ui/Pagination";

export const Users: React.FC = () => {
  const {
    getUsers,
    users,
    selectedUserIds,
    toggleUserSelection,
    selectAllUsers,
    clearUserSelection,
    deleteSelectedUsers,
  } = useUserStore();

  const {
    setPositionFilter,
    setTextFilter,
    positionFilter,
    textFilter,
    isModalOpen,
    openModal,
    closeModal,
    selectedUser,
  } = useUserFilterStore();

  const { currentPage, setCurrentPage } = usePaginationStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
    if (selectedUserIds.length === users.length) {
      clearUserSelection();
    } else {
      selectAllUsers();
    }
  };

  const handleDeleteClick = () => deleteSelectedUsers();

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          (positionFilter === "Все пользователи" ||
            user.position === positionFilter) &&
          (textFilter === "" ||
            user.id.toString().includes(textFilter) ||
            user.number.includes(textFilter))
      ),
    [users, positionFilter, textFilter]
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(
    () =>
      filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredUsers, currentPage, itemsPerPage]
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
          <UserModal
            onClose={closeModal}
            user={selectedUser}
            toggleUserSelection={toggleUserSelection}
            selectedUserIds={selectedUserIds}
          />
        )}

        <select
          className="border border-gray-300 rounded-md p-2 w-[40%] h-10"
          onChange={handleFilterChange}
          value={positionFilter}
        >
          <option value="Все пользователи">Все пользователи</option>
          <option value="По дате регистрации(новые)">
            По дате регистрации(новые)
          </option>
          <option value="По дате регистрации(старые)">
            По дате регистрации(старые)
          </option>
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
            checked={selectedUserIds.length === users.length}
          />
          <p className="text-gray-400 cursor-pointer">
            Выбрать всех пользователей
          </p>
        </div>
        <button
          className="ml-auto text-customBlue"
          onClick={handleDeleteClick}
          disabled={selectedUserIds.length === 0}
        >
          Удалить
        </button>
      </div>
      <UsersList
        users={paginatedUsers}
        toggleUserSelection={toggleUserSelection}
        selectedUserIds={selectedUserIds}
      />

      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalUsers={filteredUsers.length}
      />
    </div>
  );
};
