import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

type ResetConfirmDialogProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ResetConfirmDialog({
  isOpen,
  onCancel,
  onConfirm,
}: ResetConfirmDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onCancel} title="Reset dữ liệu">
      <div className="border-b border-slate-900 p-5 text-center">
        <p className="font-bold">Bạn có chắc chắn muốn reset dữ liệu không?</p>
        <p className="mt-2 text-slate-700">
          Tất cả chỉnh sửa, thêm mới, xóa hoặc cập nhật chức vụ sẽ quay lại
          trạng thái ban đầu được lưu trong localStorage.
        </p>
      </div>
      <div className="flex justify-center gap-3 p-4">
        <Button variant="danger" onClick={onConfirm}>
          Reset dữ liệu
        </Button>
        <Button onClick={onCancel}>Hủy bỏ</Button>
      </div>
    </Dialog>
  );
}
