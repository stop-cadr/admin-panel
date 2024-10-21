import { UserPaginationProps } from "../types/types";

export const UserPagination: React.FC<UserPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalUsers,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-between items-center py-4 p-4">
      <span className="text-sm text-gray-600">
        Всего пользователей: {totalUsers}
      </span>
      <div className="flex items-center space-x-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md border ${
            currentPage === 1
              ? "bg-white opacity-50 cursor-not-allowed"
              : "bg-customBlue text-white"
          }`}
        >
          &lt;
        </button>

        {generatePageNumbers().map((pageNumber) => (
          <button
            key={`page-${pageNumber}`}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === pageNumber
                ? "bg-customBlue text-white"
                : "bg-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md border ${
            currentPage === totalPages
              ? "bg-white cursor-not-allowed"
              : "bg-customBlue text-white"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
