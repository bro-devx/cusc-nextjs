import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

type PaginationProps = {
  page: number;
  pageSize: number;
  pageSizeOptions: number[];
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export function Pagination({
  page,
  pageSize,
  pageSizeOptions,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-slate-700">
        Tổng số cán bộ: <strong>{totalItems}</strong>
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          <p className="whitespace-nowrap">Số dòng/trang:</p>
          <Select
            className="w-20"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </label>
        <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Trước
        </Button>
        <span className="text-sm font-semibold">
          Trang {page} / {totalPages}
        </span>
        <Button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Sau
        </Button>
      </div>
    </div>
  );
}
