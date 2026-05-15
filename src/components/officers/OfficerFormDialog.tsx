"use client";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/Input";
import type { Gender, Officer } from "@/types/officer";
import {
  hasValidationErrors,
  type OfficerFormErrors,
  type OfficerFormValues,
  validateOfficerForm,
} from "@/utils/validation";
import { useState } from "react";

type OfficerFormDialogProps = {
  isOpen: boolean;
  editingOfficer: Officer | null;
  onCancel: () => void;
  onSubmit: (values: OfficerFormValues) => void;
};

const emptyValues: OfficerFormValues = {
  fullName: "",
  gender: "Nam",
  address: "",
  phone: "",
  email: "",
};

export function OfficerFormDialog({
  isOpen,
  editingOfficer,
  onCancel,
  onSubmit,
}: OfficerFormDialogProps) {
  const [values, setValues] = useState<OfficerFormValues>(
    editingOfficer
      ? {
          fullName: editingOfficer.fullName,
          gender: editingOfficer.gender,
          address: editingOfficer.address,
          phone: editingOfficer.phone,
          email: editingOfficer.email,
        }
      : emptyValues,
  );
  const [errors, setErrors] = useState<OfficerFormErrors>({});

  function updateValue<Key extends keyof OfficerFormValues>(
    key: Key,
    value: OfficerFormValues[Key],
  ) {
    const nextValues = { ...values, [key]: value };
    setValues(nextValues);

    if (hasValidationErrors(errors)) {
      setErrors(validateOfficerForm(nextValues));
    }
  }

  return (
    <Dialog isOpen={isOpen} title="Thêm mới/cập nhật Cán bộ">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const nextErrors = validateOfficerForm(values);
          setErrors(nextErrors);

          if (!hasValidationErrors(nextErrors)) {
            onSubmit({
              ...values,
              fullName: values.fullName.trim(),
              address: values.address.trim(),
              phone: values.phone.trim(),
              email: values.email.trim(),
            });
          }
        }}
      >
        <FormRow label="Họ và tên">
          <Input
            value={values.fullName}
            onChange={(event) => updateValue("fullName", event.target.value)}
          />
          <FieldError message={errors.fullName} />
        </FormRow>

        <FormRow label="Giới tính">
          <div className="flex items-center gap-5 py-1">
            {(["Nam", "Nữ"] as Gender[]).map((gender) => (
              <label key={gender} className="flex items-center gap-2 text-base">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={values.gender === gender}
                  onChange={() => updateValue("gender", gender)}
                />
                {gender}
              </label>
            ))}
          </div>
        </FormRow>

        <FormRow label="Địa chỉ">
          <Input
            value={values.address}
            onChange={(event) => updateValue("address", event.target.value)}
          />
          <FieldError message={errors.address} />
        </FormRow>

        <FormRow label="Điện thoại">
          <Input
            inputMode="numeric"
            maxLength={11}
            pattern="[0-9]*"
            value={values.phone}
            onChange={(event) =>
              updateValue("phone", event.target.value.replace(/\D/g, ""))
            }
          />
          <FieldError message={errors.phone} />
        </FormRow>

        <FormRow label="Email">
          <Input
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
          />
          <FieldError message={errors.email} />
        </FormRow>

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

function FormRow({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(140px,280px)_1fr] border-b border-slate-900">
      <label className="border-r border-slate-900 px-4 py-2 text-right font-bold">
        {label}
      </label>
      <div className="px-3 py-1.5">{children}</div>
    </div>
  );
}
