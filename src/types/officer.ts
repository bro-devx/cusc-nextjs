export type Gender = "Nam" | "Nữ";

export type Position = "Giám đốc" | "Trưởng phòng" | "Nhân viên";

export type Officer = {
  id: string;
  fullName: string;
  gender: Gender;
  address: string;
  phone: string;
  email: string;
  position: Position;
  appointedDate?: string;
};

export type PaginatedOfficers = {
  items: Officer[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
