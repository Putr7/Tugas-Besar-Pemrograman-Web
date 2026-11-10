import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';
import { useToastStore, ToastType } from '../../store/toastStore';

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-status-danger shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-status-warning shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
};

const borderMap: Record<ToastType, string> = {
  success: 'border-l-4 border-status-success bg-white',
  error: 'border-l-4 border-status-danger bg-white',
  warning: 'border-l-4 border-status-warning bg-white',
  info: 'border-l-4 border-blue-500 bg-white',
};

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-xl shadow-lg border border-corporate-border p-4 flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-top-2 ${borderMap[toast.type]}`}
          role="alert"
        >
          {iconMap[toast.type]}
          <div className="flex-1 min-w-0">
            {toast.title && (
              <h4 className="text-xs font-bold text-corporate-navy">{toast.title}</h4>
            )}
            <p className="text-xs text-corporate-slate leading-relaxed mt-0.5">
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="text-corporate-slate hover:text-corporate-navy p-1 rounded-lg hover:bg-corporate-slateLighter transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
