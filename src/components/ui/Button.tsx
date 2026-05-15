import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger" | "link";
  }
>;

const variants = {
  primary: "border-slate-900 bg-slate-900 text-white hover:bg-slate-700",
  secondary: "border-slate-400 bg-white text-slate-900 hover:bg-slate-100",
  danger: "border-red-600 bg-red-600 text-white hover:bg-red-700",
  link: "border-transparent bg-transparent text-blue-700 underline hover:text-blue-900",
};

export function Button({
  children,
  className = "",
  variant = "secondary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-9 items-center justify-center rounded border px-4 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
