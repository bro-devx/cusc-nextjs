import type { Officer } from "@/types/officer";

export type OfficerFormValues = Pick<
  Officer,
  "fullName" | "gender" | "address" | "phone" | "email"
>;

export type OfficerFormErrors = Partial<Record<keyof OfficerFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{10,11}$/;

export function validateOfficerForm(values: OfficerFormValues): OfficerFormErrors {
  const errors: OfficerFormErrors = {};
  const fullName = values.fullName.trim();
  const address = values.address.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();

  if (fullName.length < 3 || fullName.length > 20) {
    errors.fullName = "Họ và tên phải từ 3 đến 20 ký tự.";
  }

  if (address.length < 3 || address.length > 100) {
    errors.address = "Địa chỉ phải từ 3 đến 100 ký tự.";
  }

  if (!phonePattern.test(phone)) {
    errors.phone = "Điện thoại phải đúng 10 hoặc 11 số.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Email phải đúng định dạng, ví dụ: user@gmail.com.";
  }

  return errors;
}

export function hasValidationErrors(errors: OfficerFormErrors) {
  return Object.keys(errors).length > 0;
}
