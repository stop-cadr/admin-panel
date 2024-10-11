import { useAuthStore } from "@/store/store";

export const List = () => {
  const employees = useAuthStore((state) => state.employees);
  return (
    <div className="">
      {employees && employees.length > 0 ? (
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b  ">
              <th className="p-3 text-sm font-medium text-gray-600 w-36">ID</th>
              <th className="p-3 text-sm font-medium text-gray-600">Имя</th>
              <th className="p-3 text-sm font-medium text-gray-600">
                Номер телефона
              </th>
              <th className="p-3 text-sm font-medium text-gray-600">
                Должность
              </th>
              <th className="p-3 text-sm font-medium text-gray-600">Статус</th>
              <th className="p-3 text-sm font-medium text-gray-600">
                Управление
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, id) => (
              <tr key={id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm">{employee.id}</td>

                <td className="p-3 text-sm">{employee.name}</td>
                <td className="p-3 text-sm">{employee.phone}</td>
                <td className="p-3 text-sm">{employee.position}</td>

                <td className="p-3 text-sm">
                  <span
                    className={`${
                      employee.status === true
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {employee.status === true ? "Онлайн" : "Оффлайн"}
                  </span>
                </td>
                <td className="p-3 text-sm">
                  <button className="text-blue-500 hover:underline">
                    Подробнее
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600">
              Всего сотрудников: {employees.length}
            </span>
          </div>
        </table>
      ) : (
        <p className="text-gray-600">Сотрудников нет</p>
      )}
    </div>
  );
};
