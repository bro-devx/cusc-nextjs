import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import type { Officer } from "@/types/officer";

type DeleteConfirmDialogProps = {
  officer: Officer | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmDialog({
  officer,
  onCancel,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog isOpen={Boolean(officer)} title="Xóa cán bộ">
      <div className="border-b border-slate-900 p-5 text-center font-bold">
        Bạn có chắc chắn muốn xóa cán bộ này không?
        {officer ? (
          <p className="mt-2 font-normal text-slate-700">{officer.fullName}</p>
        ) : null}
      </div>
      <div className="flex justify-center gap-3 p-4">
        <Button variant="danger" onClick={onConfirm}>
          Chắc chắn!
        </Button>
        <Button onClick={onCancel}>Hủy bỏ</Button>
      </div>
    </Dialog>
  );
}
