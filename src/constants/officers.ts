import type { Officer, Position } from "@/types/officer";

export const PAGE_SIZE = 3;
export const PAGE_SIZE_OPTIONS = [3, 5, 10];

export const POSITIONS: Position[] = ["Giám đốc", "Trưởng phòng", "Nhân viên"];

export const INITIAL_OFFICERS: Officer[] = [
  {
    id: "officer-1",
    fullName: "Nguyễn Văn A",
    gender: "Nam",
    address: "Cần Thơ",
    phone: "0123456789",
    email: "nva@gmail.com",
    position: "Giám đốc",
  },
  {
    id: "officer-2",
    fullName: "Nguyễn Thị B",
    gender: "Nữ",
    address: "Hậu Giang",
    phone: "0123456789",
    email: "ntb@gmail.com",
    position: "Trưởng phòng",
  },
  {
    id: "officer-3",
    fullName: "Nguyễn Văn C",
    gender: "Nam",
    address: "Vĩnh Long",
    phone: "0123456789",
    email: "nvc@gmail.com",
    position: "Nhân viên",
  },
  {
    id: "officer-4",
    fullName: "Nguyễn Văn D",
    gender: "Nam",
    address: "Sóc Trăng",
    phone: "0987654321",
    email: "nvd@gmail.com",
    position: "Nhân viên",
  },
];
