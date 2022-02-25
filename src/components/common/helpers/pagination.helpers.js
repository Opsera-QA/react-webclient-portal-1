export function paginateData (data, currentPage, pageSize) {
  if (!Array.isArray(data) || typeof currentPage !== "number" || typeof pageSize !== "number"){
    return [];
  }

  const startRow = pageSize * (currentPage - 1);
  const endRow = startRow + pageSize;
  return data?.slice(startRow, endRow);
}