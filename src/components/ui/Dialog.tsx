import type { PropsWithChildren } from "react";
import { useEffect } from "react";

type DialogProps = PropsWithChildren<{
  isOpen: boolean;
  onClose?: () => void;
  title: string;
}>;

export function Dialog({ children, isOpen, onClose, title }: DialogProps) {
  useEffect(() => {
    if (!isOpen || !onClose) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <section className="w-full max-w-3xl border border-slate-900 bg-white shadow-xl">
        <h2 className="border-b border-slate-900 px-3 py-1 text-lg font-bold">
          {title}
        </h2>
        {children}
      </section>
    </div>
  );
}
