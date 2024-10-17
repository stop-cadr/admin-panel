import React from "react";
import { useAuthStore } from "@/store/store";
import { ListProps } from "@/pages/employees/";

export const List: React.FC<ListProps> = ({
  employees,
  toggleEmployeeSelection,
  selectedEmployeeIds,
}) => {
  const openModal = useAuthStore((state) => state.openModal);

  if (!employees || employees.length === 0) {
    return <div className="text-center py-4">Список сотрудников пуст.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b text-center">
            <th className="p-3 text-sm font-medium text-gray-600 w-36 border-r">
              ID
            </th>
            <th className="p-3 text-sm font-medium text-gray-600 border-r">
              Имя
            </th>
            <th className="p-3 text-sm font-medium text-gray-600 border-r">
              Номер телефона
            </th>
            <th className="p-3 text-sm font-medium text-gray-600 border-r">
              E-mail
            </th>
            <th className="p-3 text-sm font-medium text-gray-600 border-r">
              Должность
            </th>
            <th className="p-3 text-sm font-medium text-gray-600 border-r">
              Статус
            </th>
            <th className="p-3 text-sm font-medium text-gray-600">
              Управление
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-sm border-r">
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={selectedEmployeeIds.includes(employee.id)}
                  onChange={() => toggleEmployeeSelection(employee.id)}
                />
                {employee.id}
              </td>
              <td className="p-3 text-sm border-r text-center">
                {employee.name}
              </td>
              <td className="p-3 text-sm border-r text-center">
                {employee.phone}
              </td>
              <td className="p-3 text-sm border-r text-center">
                {employee.email}
              </td>
              <td className="p-3 text-sm border-r text-center">
                {employee.position}
              </td>
              <td className="p-3 text-sm border-r text-center">
                {employee.status}
              </td>
              <td className="p-3 text-sm text-center">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => openModal(employee)}
                >
                  Подробнее
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
