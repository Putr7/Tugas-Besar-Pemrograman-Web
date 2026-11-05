import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-corporate-border px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-corporate-slate">
        <p className="font-normal text-center sm:text-left">
          &copy; 2026 <span className="font-bold text-corporate-navy">CV. Tata Saka</span>. Konsultan Pengawas & Perencana.
        </p>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Sistem Informasi Pengawasan Jalan</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
