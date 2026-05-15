import { Button } from "@/components/ui/Button";
import type { Officer } from "@/types/officer";

type OfficerTableProps = {
  officers: Officer[];
  startIndex: number;
  onCreate: () => void;
  onEdit: (officer: Officer) => void;
  onDelete: (officer: Officer) => void;
  onUpdatePosition: (officer: Officer) => void;
};

export function OfficerTable({
  officers,
  startIndex,
  onCreate,
  onEdit,
  onDelete,
  onUpdatePosition,
}: OfficerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-225 border-collapse border border-slate-900 bg-white text-sm">
        <thead>
          <tr>
            <th
              colSpan={10}
              className="border border-slate-900 bg-slate-100 p-2 text-left text-base"
            >
              <Button onClick={onCreate} variant="secondary">
                Thêm mới cán bộ
              </Button>
            </th>
          </tr>
          <tr className="bg-slate-100">
            <th className="border border-slate-900 p-2">STT</th>
            <th className="border border-slate-900 p-2">Họ và tên</th>
            <th className="border border-slate-900 p-2">Nữ</th>
            <th className="border border-slate-900 p-2">Địa chỉ</th>
            <th className="border border-slate-900 p-2">Điện thoại</th>
            <th className="border border-slate-900 p-2">Email</th>
            <th className="border border-slate-900 p-2">Chức vụ</th>
            <th className="border border-slate-900 p-2">Sửa</th>
            <th className="border border-slate-900 p-2">Xóa</th>
            <th className="border border-slate-900 p-2">Cập nhật Chức vụ</th>
          </tr>
        </thead>
        <tbody>
          {officers.map((officer, index) => (
            <tr key={officer.id}>
              <td className="border border-slate-900 p-2 text-center">
                {startIndex + index + 1}
              </td>
              <td className="border border-slate-900 p-2">
                {officer.fullName}
              </td>
              <td className="border border-slate-900 p-2 text-center">
                {officer.gender === "Nữ" ? "x" : ""}
              </td>
              <td className="border border-slate-900 p-2">{officer.address}</td>
              <td className="border border-slate-900 p-2">{officer.phone}</td>
              <td className="border border-slate-900 p-2">{officer.email}</td>
              <td className="border border-slate-900 p-2">
                {officer.position}
              </td>
              <td className="border border-slate-900 p-2 text-center">
                <Button onClick={() => onEdit(officer)}>Sửa</Button>
              </td>
              <td className="border border-slate-900 p-2 text-center">
                <Button variant="danger" onClick={() => onDelete(officer)}>
                  Xóa
                </Button>
              </td>
              <td className="border border-slate-900 p-2 text-center">
                <Button
                  variant="link"
                  onClick={() => onUpdatePosition(officer)}
                >
                  Cập nhật
                </Button>
              </td>
            </tr>
          ))}
          {officers.length === 0 ? (
            <tr>
              <td
                colSpan={10}
                className="border border-slate-900 p-6 text-center text-slate-600"
              >
                Chưa có cán bộ nào.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
