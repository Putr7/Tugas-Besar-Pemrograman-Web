import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-corporate-softGray flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
      <footer className="mt-8 text-center text-xs text-corporate-slate">
        &copy; 2026 Tata Saka Consultant. Seluruh hak cipta dilindungi.
      </footer>
    </div>
  );
};

export default AuthLayout;

