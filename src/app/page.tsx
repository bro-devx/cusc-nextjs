"use client";

import { DeleteConfirmDialog } from "@/components/officers/DeleteConfirmDialog";
import { OfficerFormDialog } from "@/components/officers/OfficerFormDialog";
import { OfficerTable } from "@/components/officers/OfficerTable";
import { Pagination } from "@/components/officers/Pagination";
import { PositionDialog } from "@/components/officers/PositionDialog";
import { ResetConfirmDialog } from "@/components/officers/ResetConfirmDialog";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import {
  INITIAL_OFFICERS,
  PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
} from "@/constants/officers";
import type { Officer, Position } from "@/types/officer";
import { paginateOfficers } from "@/utils/pagination";
import { loadPaginatedOfficers, savePaginatedOfficers } from "@/utils/storage";
import type { OfficerFormValues } from "@/utils/validation";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <OfficerManagement />
    </Suspense>
  );
}

function OfficerManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchParamsRef = useRef(searchParams);
  const [initialData] = useState(() =>
    paginateOfficers(INITIAL_OFFICERS, 1, PAGE_SIZE),
  );
  const [officers, setOfficers] = useState<Officer[]>(initialData.items);
  const [currentPage, setCurrentPage] = useState(initialData.page);
  const [pageSize, setPageSize] = useState(initialData.pageSize);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);
  const [isOfficerDialogOpen, setIsOfficerDialogOpen] = useState(false);
  const [positionOfficer, setPositionOfficer] = useState<Officer | null>(null);
  const [deleteOfficer, setDeleteOfficer] = useState<Officer | null>(null);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      const storedData = loadPaginatedOfficers();
      const initialSearchParams = initialSearchParamsRef.current;
      const nextPageSize = getValidPageSize(
        initialSearchParams.get("pageSize"),
        storedData.pageSize,
      );
      const nextPage = getValidPage(initialSearchParams.get("page"), storedData.page);
      const nextPagination = paginateOfficers(
        storedData.items,
        nextPage,
        nextPageSize,
      );

      setOfficers(storedData.items);
      setCurrentPage(nextPagination.page);
      setPageSize(nextPagination.pageSize);
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  const paginatedData = useMemo(
    () => paginateOfficers(officers, currentPage, pageSize),
    [currentPage, officers, pageSize],
  );

  const updatePaginationUrl = useCallback(
    (nextPage: number, nextPageSize: number) => {
      const params = new URLSearchParams(window.location.search);
      const nextPageValue = String(nextPage);
      const nextPageSizeValue = String(nextPageSize);

      if (
        params.get("page") === nextPageValue &&
        params.get("pageSize") === nextPageSizeValue
      ) {
        return;
      }

      params.set("page", nextPageValue);
      params.set("pageSize", nextPageSizeValue);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    savePaginatedOfficers(paginatedData);
  }, [isHydrated, paginatedData]);

  function showToast(message: string) {
    setToastMessage(message);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage("");
      toastTimerRef.current = null;
    }, 2500);
  }

  function openCreateDialog() {
    setEditingOfficer(null);
    setIsOfficerDialogOpen(true);
  }

  function openEditDialog(officer: Officer) {
    setEditingOfficer(officer);
    setIsOfficerDialogOpen(true);
  }

  function closeOfficerDialog() {
    setIsOfficerDialogOpen(false);
    setEditingOfficer(null);
  }

  function handleOfficerSubmit(values: OfficerFormValues) {
    if (editingOfficer) {
      setOfficers((currentOfficers) =>
        currentOfficers.map((officer) =>
          officer.id === editingOfficer.id
            ? { ...officer, ...values }
            : officer,
        ),
      );
    } else {
      setOfficers((currentOfficers) => [
        ...currentOfficers,
        {
          ...values,
          id: `officer-${Date.now()}`,
          position: "Nhân viên",
        },
      ]);
      setCurrentPage(Math.ceil((officers.length + 1) / pageSize));
      showToast("Thêm cán bộ thành công");
      closeOfficerDialog();
      return;
    }

    showToast("Cập nhật cán bộ thành công");
    closeOfficerDialog();
  }

  function handleDeleteConfirm() {
    if (!deleteOfficer) {
      return;
    }

    const nextOfficers = officers.filter(
      (officer) => officer.id !== deleteOfficer.id,
    );
    setOfficers(nextOfficers);
    setCurrentPage((currentValue) =>
      Math.min(
        currentValue,
        Math.max(Math.ceil(nextOfficers.length / pageSize), 1),
      ),
    );
    setDeleteOfficer(null);
    showToast("Xóa cán bộ thành công");
  }

  function handlePositionSubmit(position: Position, appointedDate: string) {
    if (!positionOfficer) {
      return;
    }

    setOfficers((currentOfficers) =>
      currentOfficers.map((officer) =>
        officer.id === positionOfficer.id
          ? { ...officer, position, appointedDate }
          : officer,
      ),
    );
    setPositionOfficer(null);
    showToast("Cập nhật chức vụ thành công");
  }

  function handlePageSizeChange(nextPageSize: number) {
    setPageSize(nextPageSize);
    setCurrentPage(1);
    updatePaginationUrl(1, nextPageSize);
  }

  function handleResetConfirm() {
    setOfficers(INITIAL_OFFICERS);
    setCurrentPage(1);
    setPageSize(PAGE_SIZE);
    setIsResetDialogOpen(false);
    showToast("Đã reset dữ liệu ban đầu");
    updatePaginationUrl(1, PAGE_SIZE);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <p className="font-semibold uppercase">Đại học Cần Thơ</p>
          <p className="font-semibold uppercase">
            Trung tâm Công nghệ Phần mềm
          </p>
          <h1 className="mt-6 text-3xl font-bold uppercase">
            Danh sách Cán bộ
          </h1>
        </header>

        <div className="mb-3 flex justify-end">
          <Button variant="danger" onClick={() => setIsResetDialogOpen(true)}>
            Reset dữ liệu
          </Button>
        </div>

        <OfficerTable
          officers={paginatedData.visibleItems}
          startIndex={paginatedData.startIndex}
          onCreate={openCreateDialog}
          onEdit={openEditDialog}
          onDelete={setDeleteOfficer}
          onUpdatePosition={setPositionOfficer}
        />

        <Pagination
          page={paginatedData.page}
          pageSize={paginatedData.pageSize}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          totalPages={paginatedData.totalPages}
          totalItems={paginatedData.totalItems}
          onPageChange={(nextPage) => {
            setCurrentPage(nextPage);
            updatePaginationUrl(nextPage, pageSize);
          }}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {isOfficerDialogOpen ? (
        <OfficerFormDialog
          isOpen={isOfficerDialogOpen}
          editingOfficer={editingOfficer}
          onCancel={closeOfficerDialog}
          onSubmit={handleOfficerSubmit}
        />
      ) : null}
      {positionOfficer ? (
        <PositionDialog
          officer={positionOfficer}
          onCancel={() => setPositionOfficer(null)}
          onSubmit={handlePositionSubmit}
        />
      ) : null}
      <DeleteConfirmDialog
        officer={deleteOfficer}
        onCancel={() => setDeleteOfficer(null)}
        onConfirm={handleDeleteConfirm}
      />
      <ResetConfirmDialog
        isOpen={isResetDialogOpen}
        onCancel={() => setIsResetDialogOpen(false)}
        onConfirm={handleResetConfirm}
      />
      <Toast message={toastMessage} />
    </main>
  );
}

function getValidPage(value: string | null, fallback: number) {
  const page = Number(value);

  if (Number.isInteger(page) && page >= 1) {
    return page;
  }

  return fallback;
}

function getValidPageSize(value: string | null, fallback: number) {
  const pageSize = Number(value);

  if (PAGE_SIZE_OPTIONS.includes(pageSize)) {
    return pageSize;
  }

  return fallback;
}
