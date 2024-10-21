import { ListProps } from "@/pages/users/types/types";
import { useUserFilterStore } from "@/store/filterStore";

export const UsersList: React.FC<ListProps> = ({
  users,
  toggleUserSelection,
  selectedUserIds,
}) => {
  const { openModal } = useUserFilterStore();

  if (!users || users.length === 0) {
    return <div className="text-center py-4">Список пользователей пуст.</div>;
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
              Дата регистрации
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
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-sm border-r">
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                />
                {user.id}
              </td>
              <td className="p-3 text-sm border-r text-center">{user.name}</td>
              <td className="p-3 text-sm border-r text-center">
                {user.number}
              </td>
              <td className="p-3 text-sm border-r text-center">{user.date}</td>
              <td className="p-3 text-sm border-r text-center">
                {user.status}
              </td>
              <td className="p-3 text-sm text-center">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => openModal(user)}
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
