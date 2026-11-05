import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const GuestRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const localToken = localStorage.getItem('tata_saka_token');
  const isAuthenticated = Boolean(token || localToken);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default GuestRoute;

