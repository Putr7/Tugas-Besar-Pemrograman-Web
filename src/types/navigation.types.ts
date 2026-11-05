import { ReactNode } from 'react';

export interface NavMenuItem {
  title: string;
  path: string;
  icon: ReactNode;
  badge?: string | number;
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger';
  children?: Omit<NavMenuItem, 'icon'>[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}

