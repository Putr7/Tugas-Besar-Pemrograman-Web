import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  User,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Dropdown, DropdownItem } from '../ui/Dropdown';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar, toggleMobileMenu } = useAppStore();
  const { user, logout } = useAuthStore();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'Dashboard';
    if (path === '/kontrak') return 'Daftar Kontrak';
    if (path.startsWith('/kontrak/')) return 'Detail Kontrak';
    if (path.startsWith('/laporan')) return 'Laporan Proyek';
    if (path.startsWith('/timeline')) return 'Kronologi Proyek';
    if (path.startsWith('/pengaturan')) return 'Akun';
    return 'Tata Saka Consultant';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems: DropdownItem[] = [
    {
      label: 'Informasi Akun',
      icon: <User className="w-4 h-4" />,
      onClick: () => navigate('/pengaturan'),
    },
    {
      label: 'divider',
      divider: true,
    },
    {
      label: 'Keluar (Logout)',
      icon: <LogOut className="w-4 h-4" />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-corporate-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left: Mobile Drawer Button & Desktop Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="p-2 rounded-xl text-corporate-navy hover:bg-corporate-slateLighter lg:hidden focus:outline-none"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden lg:flex p-2 rounded-xl text-corporate-navy hover:bg-corporate-slateLighter focus:outline-none transition-colors"
          title={isSidebarCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>

        <h1 className="text-base sm:text-lg font-bold text-corporate-navy tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right: Notifications & User Avatar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => alert('Tidak ada notifikasi baru')}
          className="p-2 rounded-xl text-corporate-navy hover:bg-corporate-slateLighter transition-colors"
          title="Notifikasi"
        >
          <Bell className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-corporate-border" />

        <Dropdown
          trigger={
            <button className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-corporate-slateLighter transition-colors text-left focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-corporate-navy flex items-center justify-center font-bold text-xs border border-corporate-border">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-corporate-navy leading-tight">
                  {user?.name || 'CV. Tata Saka'}
                </span>
                <span className="text-[10px] text-corporate-slate font-medium">
                  {user?.role || 'Konsultan'}
                </span>
              </div>
            </button>
          }
          items={userMenuItems}
        />
      </div>
    </header>
  );
};

export default Navbar;
