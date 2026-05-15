import type { Officer, PaginatedOfficers } from "@/types/officer";

export function getSafePage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

export function paginateOfficers(
  items: Officer[],
  page: number,
  pageSize: number,
): PaginatedOfficers & { visibleItems: Officer[]; startIndex: number; endIndex: number } {
  const totalItems = items.length;
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const safePage = getSafePage(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    items,
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
    visibleItems: items.slice(startIndex, endIndex),
    startIndex,
    endIndex,
  };
}
