import type { SelectHTMLAttributes } from "react";

export function Select({
  children,
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full border border-slate-500 bg-white px-3 py-1.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
