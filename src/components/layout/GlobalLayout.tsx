import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

export const GlobalLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-corporate-softGray flex flex-row">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Navbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default GlobalLayout;
