"use client";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { POSITIONS } from "@/constants/officers";
import type { Officer, Position } from "@/types/officer";
import { useState } from "react";

type PositionDialogProps = {
  officer: Officer | null;
  onCancel: () => void;
  onSubmit: (position: Position, appointedDate: string) => void;
};

export function PositionDialog({
  officer,
  onCancel,
  onSubmit,
}: PositionDialogProps) {
  const [position, setPosition] = useState<Position>(
    officer?.position ?? "Nhân viên",
  );
  const [appointedDate, setAppointedDate] = useState(
    officer?.appointedDate ?? "",
  );

  return (
    <Dialog isOpen={Boolean(officer)} onClose={onCancel} title="Cập nhật chức vụ">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(position, appointedDate);
        }}
      >
        <div className="grid grid-cols-[minmax(140px,280px)_1fr] border-b border-slate-900">
          <label className="border-r border-slate-900 px-4 py-2 text-right font-bold">
            Họ và tên
          </label>
          <div className="px-3 py-1.5">
            <Input value={officer?.fullName ?? ""} disabled />
          </div>
        </div>
        <div className="grid grid-cols-[minmax(140px,280px)_1fr] border-b border-slate-900">
          <label className="border-r border-slate-900 px-4 py-2 text-right font-bold">
            Chức vụ
          </label>
          <div className="px-3 py-1.5">
            <Select
              value={position}
              onChange={(event) => setPosition(event.target.value as Position)}
            >
              <option value="" disabled>
                ---- Chọn chức vụ ----
              </option>
              {POSITIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-[minmax(140px,280px)_1fr] border-b border-slate-900">
          <label className="border-r border-slate-900 px-4 py-2 text-right font-bold">
            Ngày bổ nhiệm
          </label>
          <div className="px-3 py-1.5">
            <Input
              type="date"
              value={appointedDate}
              onChange={(event) => setAppointedDate(event.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3 p-4 pl-[calc(min(280px,40%)+12px)]">
          <Button type="submit" variant="primary">
            Cập nhật
          </Button>
          <Button onClick={onCancel}>Hủy bỏ</Button>
        </div>
      </form>
    </Dialog>
  );
}
