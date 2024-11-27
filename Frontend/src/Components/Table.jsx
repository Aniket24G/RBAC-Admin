import React from "react";

const Table = ({
  headers,
  data,
  actions,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div>
      <table className="w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
            {actions && (
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index} className="border border-gray-300 px-4 py-2">
                  {value}
                </td>
              ))}
              {actions && (
                <td className="border border-gray-300 px-4 py-2">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {totalItems>0 ? (
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {currentPage * itemsPerPage - itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          entries
        </div>
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-600 rounded disabled:bg-gray-300 text-white"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-600 rounded disabled:bg-gray-300 text-white"
          >
            Next
          </button>
        </div>
      </div>)
      : (<div>No Users Available</div>)
      }
    </div>
  );
};

export default Table;
