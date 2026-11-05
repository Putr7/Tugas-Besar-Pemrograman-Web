import { create } from 'zustand';
import { BreadcrumbItem } from '../types/navigation.types';

interface AppState {
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  breadcrumbs: BreadcrumbItem[];
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarCollapsed: false,
  isMobileMenuOpen: false,
  breadcrumbs: [{ label: 'Dashboard', path: '/dashboard', active: true }],

  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  setSidebarCollapsed: (isSidebarCollapsed) => set({ isSidebarCollapsed }),

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),

  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}));

