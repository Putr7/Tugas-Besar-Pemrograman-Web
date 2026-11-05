import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
} from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../config/menu.config';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { NavItem } from './NavItem';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar, isMobileMenuOpen, setMobileMenuOpen } =
    useAppStore();
  const { logout } = useAuthStore();

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  const sidebarContent = (isCollapsed: boolean, isMobile: boolean = false) => (
    <div className="flex flex-col h-full bg-white border-r border-corporate-border select-none">
      {/* Brand Header */}
      <div
        className={`h-16 flex items-center px-4 border-b border-corporate-border ${
          isCollapsed && !isMobile ? 'justify-center' : 'justify-between'
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-white border border-corporate-border p-1 flex items-center justify-center shrink-0 shadow-sm">
            <img
              src="/assets/images/logoRev.png"
              alt="Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logoRev.png';
              }}
            />
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-black text-corporate-navy tracking-tight leading-tight">
                CV. TATA SAKA
              </span>
              <span className="text-[10px] font-semibold text-corporate-slate tracking-wider uppercase">
                Konsultan Pengawas
              </span>
            </div>
          )}
        </div>

        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-corporate-slate hover:bg-corporate-slateLighter"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {(!isCollapsed || isMobile) && (
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Menu Navigasi
          </div>
        )}
        {MAIN_NAV_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isCollapsed={isCollapsed && !isMobile}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          />
        ))}
      </div>

      {/* Sidebar Footer / Toggle & Logout */}
      <div className="p-3 border-t border-corporate-border space-y-1">
        <button
          onClick={logout}
          title={isCollapsed && !isMobile ? 'Keluar' : undefined}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-status-danger hover:bg-red-50 transition-colors ${
            isCollapsed && !isMobile ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {(!isCollapsed || isMobile) && <span>Keluar Akun</span>}
        </button>

        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex w-full items-center justify-center py-2 text-corporate-slate hover:text-corporate-navy hover:bg-corporate-slateLighter rounded-xl text-xs transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-2 font-medium">
                <ChevronLeft className="w-4 h-4" />
                <span>Ciutkan Menu</span>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={`hidden lg:block shrink-0 h-screen sticky top-0 transition-all duration-300 z-40 ${
          isSidebarCollapsed ? 'w-20' : 'w-[250px]'
        }`}
      >
        {sidebarContent(isSidebarCollapsed, false)}
      </aside>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl transition-transform duration-300 z-50">
            {sidebarContent(false, true)}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
