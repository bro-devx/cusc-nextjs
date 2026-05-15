type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed right-4 top-4 z-[60] rounded border border-emerald-500 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-lg">
      {message}
    </div>
  );
}
