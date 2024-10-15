import { ListProps } from "../types/types";

export const List: React.FC<ListProps> = ({ employees }) => {
  return (
    <div className="">
      {employees && employees.length > 0 ? (
        <table className="w-full table-auto text-left border-collapse ">
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
                Должность
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 border-r">
                Статус
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 ">
                Управление
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, id) => (
              <tr key={id} className="border-b hover:bg-gray-50 ">
                <td className="p-3 text-sm border-r">
                  <input className="mr-8" type="checkbox" />
                  {employee.id}
                </td>
                <td className="p-3 text-sm border-r text-center">
                  {employee.name}
                </td>
                <td className="p-3 text-sm border-r text-center">
                  {employee.phone}
                </td>
                <td className="p-3 text-sm border-r text-center">
                  {employee.position}
                </td>
                <td className="p-3 text-sm border-r text-center">
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
                <td className="p-3 text-sm text-center">
                  <button className="text-blue-500 hover:underline">
                    Подробнее
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Сотрудников нет</p>
      )}
    </div>
  );
};
