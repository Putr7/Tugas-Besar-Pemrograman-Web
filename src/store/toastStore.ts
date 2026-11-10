import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  showSuccess: (message: string, title?: string) => string;
  showError: (message: string, title?: string) => string;
  showWarning: (message: string, title?: string) => string;
  showInfo: (message: string, title?: string) => string;
  dismissToast: (id: string) => void;
  clearAll: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  showToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastItem = { ...toast, id };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        get().dismissToast(id);
      }, duration);
    }

    return id;
  },

  showSuccess: (message, title = 'Berhasil') => {
    return get().showToast({ type: 'success', title, message });
  },

  showError: (message, title = 'Gagal') => {
    return get().showToast({ type: 'error', title, message });
  },

  showWarning: (message, title = 'Peringatan') => {
    return get().showToast({ type: 'warning', title, message });
  },

  showInfo: (message, title = 'Informasi') => {
    return get().showToast({ type: 'info', title, message });
  },

  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearAll: () => {
    set({ toasts: [] });
  },
}));

export const useToast = () => {
  const { showSuccess, showError, showWarning, showInfo, dismissToast } = useToastStore();
  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    dismiss: dismissToast,
  };
};

export default useToastStore;
