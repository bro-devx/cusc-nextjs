import { INITIAL_OFFICERS, PAGE_SIZE } from "@/constants/officers";
import type { PaginatedOfficers } from "@/types/officer";
import { paginateOfficers } from "@/utils/pagination";

const STORAGE_KEY = "cusc-officers-pagination";

export function loadPaginatedOfficers(): PaginatedOfficers {
  if (typeof window === "undefined") {
    return paginateOfficers(INITIAL_OFFICERS, 1, PAGE_SIZE);
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return paginateOfficers(INITIAL_OFFICERS, 1, PAGE_SIZE);
    }

    const parsedValue = JSON.parse(rawValue) as Partial<PaginatedOfficers>;

    if (!Array.isArray(parsedValue.items)) {
      return paginateOfficers(INITIAL_OFFICERS, 1, PAGE_SIZE);
    }

    return paginateOfficers(
      parsedValue.items,
      parsedValue.page ?? 1,
      parsedValue.pageSize ?? PAGE_SIZE,
    );
  } catch {
    return paginateOfficers(INITIAL_OFFICERS, 1, PAGE_SIZE);
  }
}

export function savePaginatedOfficers(data: PaginatedOfficers) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      items: data.items,
      page: data.page,
      pageSize: data.pageSize,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
    }),
  );
}
