import {
  LayoutDashboard,
  Folder,
  FileText,
  TrendingUp,
  User,
} from 'lucide-react';
import { NavMenuItem } from '../types/navigation.types';

export const MAIN_NAV_ITEMS: NavMenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: 'Kontrak',
    path: '/kontrak',
    icon: <Folder className="w-5 h-5" />,
  },
  {
    title: 'Laporan',
    path: '/laporan',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: 'Timeline',
    path: '/timeline',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: 'Akun',
    path: '/pengaturan',
    icon: <User className="w-5 h-5" />,
  },
];
