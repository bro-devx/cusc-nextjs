import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full border border-slate-500 px-3 py-1.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${className}`}
      {...props}
    />
  );
}
