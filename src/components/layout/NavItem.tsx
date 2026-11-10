import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavMenuItem } from '../../types/navigation.types';

interface NavItemProps {
  item: NavMenuItem;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ item, isCollapsed = false, onClick }) => {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      title={isCollapsed ? item.title : undefined}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
          isActive
            ? 'bg-corporate-navy text-white shadow-sm font-semibold'
            : 'text-corporate-slate hover:bg-corporate-slateLighter hover:text-corporate-navy'
        } ${isCollapsed ? 'justify-center' : ''}`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`shrink-0 transition-colors ${
              isActive ? 'text-white' : 'text-corporate-slate group-hover:text-corporate-navy'
            }`}
          >
            {item.icon}
          </span>

          {!isCollapsed && (
            <span className="truncate flex-1">{item.title}</span>
          )}

          {!isCollapsed && item.badge && (
            <span
              className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-corporate-slateLighter text-corporate-navy'
              }`}
            >
              {item.badge}
            </span>
          )}

          {isCollapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1 bg-corporate-navy text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 shadow-md">
              {item.title}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;
